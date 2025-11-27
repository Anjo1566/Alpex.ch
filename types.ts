export interface Trip {
  id: string;
  destination: string;
  country: string;
  startDate?: string;
  endDate?: string;
  durationDays: number;
  travelers: number;
  budget?: number;
  description: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  priceFlight: number;
  priceHotel: number;
  priceActivities: number;
  totalPrice: number;
  highlights: string[];
  status: 'draft' | 'booked' | 'past';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  // Optional structured data for rich UI rendering
  suggestedTrips?: TripProposal[]; 
  groundingSources?: GroundingSource[];
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface TripProposal {
  id: string;
  destination: string;
  country: string;
  priceEstimate: string; // e.g. "800-1000 Fr"
  flightInfo: string;
  hotelInfo: string;
  description: string;
  imageUrl: string;
  rating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export enum AppRoute {
  LANDING = 'landing',
  LOGIN = 'login',
  REGISTER = 'register',
  DASHBOARD = 'dashboard',
  CHAT = 'chat',
  TRIP_DETAILS = 'trip_details'
}
