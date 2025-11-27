import React from 'react';
import { TripProposal } from '../types';
import { Plane, Hotel, ArrowRight, Star } from 'lucide-react';

interface TripCardProps {
  trip: TripProposal;
  onSelect: (trip: TripProposal) => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 w-full max-w-sm mb-4">
      <div className="h-40 overflow-hidden relative">
        <img src={trip.imageUrl} alt={trip.destination} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-dark flex items-center">
          <Star size={12} className="text-yellow-500 fill-current mr-1" /> {trip.rating}
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
           <h3 className="text-white font-bold text-lg flex items-center">
             <span className="mr-2">🇵🇹</span> {trip.destination}, {trip.country}
           </h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
           <span className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-md">Geschätzt: {trip.priceEstimate}</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{trip.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-xs text-gray-500">
            <Plane size={14} className="mr-2 text-primary" />
            <span>{trip.flightInfo}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Hotel size={14} className="mr-2 text-primary" />
            <span>{trip.hotelInfo}</span>
          </div>
        </div>
        
        <button 
          onClick={() => onSelect(trip)}
          className="w-full bg-primary/5 hover:bg-primary/10 text-primary font-bold py-2 rounded-lg text-sm flex items-center justify-center transition"
        >
          Details ansehen <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default TripCard;
