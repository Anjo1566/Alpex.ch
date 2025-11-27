import { GoogleGenAI, FunctionDeclaration, Type, Tool } from "@google/genai";
import { TripProposal, ChatMessage, GroundingSource } from "../types";

const API_KEY = process.env.API_KEY || '';

// --- Tool Definitions ---

// Tool to let the AI present trip options visually
const presentTripsFunctionDecl: FunctionDeclaration = {
  name: 'present_trip_options',
  description: 'Present 2-3 specific travel destination options to the user with details like price, flights, and hotels.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      options: {
        type: Type.ARRAY,
        description: 'List of trip options',
        items: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING, description: 'City name' },
            country: { type: Type.STRING, description: 'Country name' },
            priceEstimate: { type: Type.STRING, description: 'Total estimated price range in CHF (e.g. "800-1000 Fr")' },
            flightInfo: { type: Type.STRING, description: 'Flight details including price and duration' },
            hotelInfo: { type: Type.STRING, description: 'Hotel details including star rating and price' },
            description: { type: Type.STRING, description: 'Short persuasive description why this is a good choice' },
            imageUrl: { type: Type.STRING, description: 'A keyword to find an image for this place (e.g. "Lisbon", "Paris")' },
            rating: { type: Type.NUMBER, description: 'Star rating (4.0-5.0)' }
          },
          required: ['destination', 'country', 'priceEstimate', 'flightInfo', 'hotelInfo', 'description', 'imageUrl', 'rating']
        }
      }
    },
    required: ['options']
  }
};

const tools: Tool[] = [
  { functionDeclarations: [presentTripsFunctionDecl] },
  { googleSearch: {} } // Enable Search Grounding
];

// --- System Instruction ---

const SYSTEM_INSTRUCTION = `
Du bist Alpex, ein freundlicher und kompetenter AI Reiseberater aus der Schweiz.

DEINE PERSÖNLICHKEIT:
- Freundlich, hilfsbereit, enthusiastisch über Reisen
- Du sprichst Schweizer Hochdeutsch (aber kein Dialekt)
- Du verwendest "Fr" oder "CHF" für Preise
- Du bist wie ein erfahrener Reiseberater, nicht wie ein Roboter

DEINE AUFGABEN:
1. Verstehe was der Nutzer sucht (Reiseart, Budget, Zeitraum, Personen, Vorlieben)
2. Stelle Rückfragen wenn wichtige Infos fehlen
3. Schlage 2-3 passende Destinationen vor mit Begründung. Nutze Google Search um aktuelle Flug- und Hotelpreise ab Zürich zu finden.
4. WICHTIG: Wenn du konkrete Destinationen vorschlägst, nutze IMMER das Tool 'present_trip_options', um sie schön darzustellen.
5. Hilf bei der Feinplanung (Tagesplan, Restaurants, Tipps)

WICHTIGE REGELN:
- Frage nach Budget falls nicht genannt
- Frage nach Reisedatum falls nicht genannt
- Frage nach Anzahl Personen falls nicht genannt
- Gib immer realistische Preisschätzungen (recherchiere aktuelle Preise)
- Erwähne Vor- und Nachteile von Optionen
- Sei ehrlich wenn etwas nicht zum Budget passt
`;

class GeminiService {
  private client: GoogleGenAI;
  private chatSession: any;

  constructor() {
    this.client = new GoogleGenAI({ apiKey: API_KEY });
  }

  async startChat() {
    this.chatSession = this.client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: tools,
        temperature: 0.7,
      },
    });
  }

  async sendMessage(text: string): Promise<{ 
    text: string, 
    suggestedTrips?: TripProposal[],
    groundingSources?: GroundingSource[]
  }> {
    if (!this.chatSession) {
      await this.startChat();
    }

    try {
      const result = await this.chatSession.sendMessage({ message: text });
      
      let responseText = result.text || "";
      let suggestedTrips: TripProposal[] | undefined = undefined;
      let groundingSources: GroundingSource[] | undefined = undefined;

      // Check for function calls (tools)
      const toolCalls = result.functionCalls;
      if (toolCalls && toolCalls.length > 0) {
        // Handle tool calls
        const functionResponses = [];
        
        for (const call of toolCalls) {
          if (call.name === 'present_trip_options') {
            const args = call.args as any;
            if (args.options) {
              suggestedTrips = args.options.map((opt: any, idx: number) => ({
                 id: `trip-${Date.now()}-${idx}`,
                 ...opt,
                 // Simple placeholder image logic
                 imageUrl: `https://picsum.photos/seed/${opt.destination}/800/600`
              }));
            }
            // We acknowledge the tool call but don't strictly need to feed data back 
            // since we are rendering it on the client side directly from the args.
            // However, to keep the chat history sane for the model, we send a success response.
             functionResponses.push({
              name: call.name,
              id: call.id, // Important to match the call ID
              response: { result: "Options displayed to user." }
            });
          }
        }
        
        // If we had tool calls, we must send the response back to get the final text turn
        if (functionResponses.length > 0) {
            const toolResponse = await this.chatSession.sendToolResponse({
                functionResponses: functionResponses
            });
             // Append any follow-up text from the model
             if (toolResponse.text) {
                 responseText += "\n" + toolResponse.text;
             }
        }
      }

      // Check for Grounding Metadata (Search Sources)
      const groundingChunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
          groundingSources = [];
          groundingChunks.forEach((chunk: any) => {
             if (chunk.web?.uri && chunk.web?.title) {
                 groundingSources?.push({
                     title: chunk.web.title,
                     uri: chunk.web.uri
                 });
             }
          });
      }

      return {
        text: responseText,
        suggestedTrips,
        groundingSources
      };

    } catch (error) {
      console.error("Gemini API Error:", error);
      return {
        text: "Entschuldigung, ich habe gerade Schwierigkeiten, eine Verbindung herzustellen. Bitte versuche es noch einmal.",
      };
    }
  }
}

export const geminiService = new GeminiService();
