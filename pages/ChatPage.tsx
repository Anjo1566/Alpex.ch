import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MapPin, Calendar, Users, Image as ImageIcon } from 'lucide-react';
import { ChatMessage, TripProposal, AppRoute } from '../types';
import { geminiService } from '../services/gemini';
import TripCard from '../components/TripCard';

interface ChatPageProps {
  onNavigate: (route: AppRoute, data?: any) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Grüezi! 👋 Ich bin Alpex, dein AI Reiseberater.\n\nErzähl mir von deinen Reiseplänen. Wohin soll es gehen, oder welche Art von Urlaub suchst du?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await geminiService.sendMessage(userMsg.text);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text,
        timestamp: new Date(),
        suggestedTrips: response.suggestedTrips,
        groundingSources: response.groundingSources
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: 'Es tut mir leid, da ist etwas schiefgelaufen. Bitte versuche es noch einmal.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const QuickButton = ({ icon, text }: { icon: string, text: string }) => (
    <button 
      onClick={() => setInput(text)}
      className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm hover:border-primary hover:text-primary transition whitespace-nowrap"
    >
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Sidebar - History (Hidden on mobile for MVP simplicity) */}
      <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col p-4">
        <button 
          onClick={() => setMessages([{ id: Date.now().toString(), role: 'model', text: 'Neuer Chat gestartet! Wohin solls gehen?', timestamp: new Date() }])}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium mb-6 hover:bg-opacity-90 flex items-center justify-center space-x-2"
        >
          <span>+ Neuer Chat</span>
        </button>
        
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Verlauf</h3>
        <div className="space-y-2 overflow-y-auto flex-1">
          <div className="p-3 bg-blue-50 text-primary rounded-lg text-sm font-medium cursor-pointer truncate">
            Strandurlaub Portugal
          </div>
          <div className="p-3 hover:bg-gray-50 text-gray-600 rounded-lg text-sm cursor-pointer truncate">
            Städtetrip London
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-hide">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`p-4 rounded-2xl shadow-sm whitespace-pre-wrap leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white text-dark border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                
                {/* Grounding Sources */}
                {msg.groundingSources && msg.groundingSources.length > 0 && (
                   <div className="mt-2 text-xs text-gray-500 px-2">
                     <span className="font-semibold">Quellen:</span>
                     <ul className="list-disc list-inside mt-1">
                       {msg.groundingSources.map((source, idx) => (
                         <li key={idx}><a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{source.title}</a></li>
                       ))}
                     </ul>
                   </div>
                )}

                {/* Suggested Trips Cards */}
                {msg.suggestedTrips && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {msg.suggestedTrips.map(trip => (
                      <TripCard 
                        key={trip.id} 
                        trip={trip} 
                        onSelect={() => onNavigate(AppRoute.TRIP_DETAILS, trip)} 
                      />
                    ))}
                  </div>
                )}
                
                <div className={`text-xs text-gray-400 mt-1 px-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.role === 'model' ? 'Alpex AI' : 'Du'} • {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center space-x-2">
                 <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce delay-75"></div>
                 <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></div>
               </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          
          {/* Quick Actions (only show if chat is empty or last msg was welcome) */}
          {messages.length < 2 && (
             <div className="flex overflow-x-auto space-x-3 pb-4 scrollbar-hide mb-2">
               <QuickButton icon="🏖️" text="Strandurlaub" />
               <QuickButton icon="🏔️" text="Skiferien" />
               <QuickButton icon="🌆" text="Städtetrip" />
               <QuickButton icon="🎒" text="Abenteuer" />
               <QuickButton icon="💑" text="Romantik" />
             </div>
          )}

          <div className="max-w-4xl mx-auto relative flex items-center bg-gray-50 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition shadow-sm">
             <input
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleKeyPress}
               placeholder="Beschreibe deine Traumreise... z.B. 'Strandurlaub für 2, Budget 2000 Fr'"
               className="flex-1 bg-transparent border-none focus:ring-0 p-4 text-dark placeholder-gray-500"
               disabled={isLoading}
             />
             <div className="flex items-center pr-3 space-x-2">
                <button className="text-gray-400 hover:text-primary transition p-2">
                  <Mic size={20} />
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`p-2 rounded-lg transition ${input.trim() ? 'bg-primary text-white shadow-md hover:bg-[#152e4d]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  <Send size={20} />
                </button>
             </div>
          </div>
          <div className="text-center text-xs text-gray-400 mt-2">
            Alpex kann Fehler machen. Überprüfe wichtige Informationen.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
