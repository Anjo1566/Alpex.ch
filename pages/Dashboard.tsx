import React from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { AppRoute, Trip } from '../types';

interface DashboardProps {
  onNavigate: (route: AppRoute) => void;
  trips: Trip[];
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, trips }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-dark">Meine Reisen</h1>
        <button 
          onClick={() => onNavigate(AppRoute.CHAT)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-90"
        >
          + Neue Reise planen
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button className="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Geplant
          </button>
          <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Gebucht
          </button>
          <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Vergangen
          </button>
        </nav>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.length > 0 ? trips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <div className="h-48 overflow-hidden relative">
              <img src={trip.imageUrl} alt={trip.destination} className="w-full h-full object-cover" />
              <div className={`absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-bold uppercase ${trip.status === 'booked' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {trip.status === 'booked' ? 'Gebucht' : 'Entwurf'}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{trip.destination}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <MapPin size={14} className="mr-1" /> {trip.country}
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded-lg">
                <Calendar size={16} className="mr-2 text-primary" />
                {trip.startDate && trip.endDate ? `${trip.startDate} - ${trip.endDate}` : 'Datum noch offen'}
                {trip.durationDays ? ` (${trip.durationDays} Tage)` : ''}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="font-bold text-lg">{trip.totalPrice ? `${trip.totalPrice} CHF` : trip.priceEstimate}</span>
                <button className="text-primary font-medium text-sm flex items-center hover:underline">
                  Bearbeiten <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-12 text-center text-gray-500">
            Noch keine Reisen geplant. Starte jetzt!
          </div>
        )}
        
        {/* Add New Card */}
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center hover:bg-gray-100 transition cursor-pointer" onClick={() => onNavigate(AppRoute.CHAT)}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-gray-400 shadow-sm">
            +
          </div>
          <h3 className="font-medium text-gray-900">Neue Reise</h3>
          <p className="text-sm text-gray-500">Lass dich von der AI inspirieren</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
