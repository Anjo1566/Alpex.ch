import React, { useState } from 'react';
import { TripProposal, AppRoute } from '../types';
import { ArrowLeft, Calendar, User, Plane, Hotel, Map, Clock, Check, Share2, Heart } from 'lucide-react';

interface TripDetailsProps {
  trip: TripProposal;
  onBack: () => void;
}

const TripDetails: React.FC<TripDetailsProps> = ({ trip, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'flights' | 'hotels' | 'plan'>('overview');

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-64 md:h-80 w-full">
        <img src={trip.imageUrl} alt={trip.destination} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-4 left-4">
          <button onClick={onBack} className="bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition">
            <ArrowLeft size={24} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto">
             <div className="flex justify-between items-end">
               <div>
                  <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mb-2">{trip.destination}</h1>
                  <p className="text-white/90 text-lg flex items-center">
                    <span className="mr-2">🇵🇹</span> {trip.country} • 5 Nächte • 2 Personen
                  </p>
               </div>
               <div className="hidden md:block">
                  <span className="text-3xl font-bold text-white">{trip.priceEstimate}</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex space-x-8">
            {['overview', 'flights', 'hotels', 'plan'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 font-medium text-sm border-b-2 whitespace-nowrap px-2 transition ${
                  activeTab === tab 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab === 'overview' && 'Übersicht'}
                {tab === 'flights' && 'Flüge'}
                {tab === 'hotels' && 'Hotels'}
                {tab === 'plan' && 'Tagesplan'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <h2 className="text-xl font-bold mb-4 font-heading">Warum {trip.destination}?</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{trip.description}</p>
                
                <h3 className="font-bold text-sm text-gray-500 uppercase tracking-wide mb-3">Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Romantische Altstadt', 'Beste Meeresfrüchte', 'Kultur & Geschichte', 'Strandnähe'].map((item, i) => (
                    <div key={i} className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg">
                      <Check size={16} className="text-green-500 mr-2" /> {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4 text-primary">
                      <Plane size={24} className="mr-3" />
                      <h3 className="font-bold text-lg">Flug Info</h3>
                    </div>
                    <p className="text-gray-600">{trip.flightInfo}</p>
                    <a href="https://skyscanner.ch" target="_blank" className="text-sm text-blue-600 hover:underline mt-2 inline-block">Flüge prüfen →</a>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4 text-primary">
                      <Hotel size={24} className="mr-3" />
                      <h3 className="font-bold text-lg">Hotel Info</h3>
                    </div>
                    <p className="text-gray-600">{trip.hotelInfo}</p>
                    <a href="https://booking.com" target="_blank" className="text-sm text-blue-600 hover:underline mt-2 inline-block">Hotels ansehen →</a>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'flights' && (
             <div className="bg-white p-8 rounded-2xl text-center border border-gray-100">
               <Plane size={48} className="mx-auto text-gray-300 mb-4" />
               <h3 className="text-xl font-bold mb-2">Flugsuche</h3>
               <p className="text-gray-500 mb-6">Wir leiten dich zu unserem Partner Skyscanner weiter für die besten Live-Preise.</p>
               <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold shadow-lg shadow-primary/20">Auf Skyscanner suchen</button>
             </div>
          )}
          
          {activeTab === 'hotels' && (
             <div className="bg-white p-8 rounded-2xl text-center border border-gray-100">
               <Hotel size={48} className="mx-auto text-gray-300 mb-4" />
               <h3 className="text-xl font-bold mb-2">Hotelsuche</h3>
               <p className="text-gray-500 mb-6">Finde die besten Unterkünfte in {trip.destination} über Booking.com.</p>
               <button className="bg-[#003580] text-white px-6 py-3 rounded-lg font-bold shadow-lg">Auf Booking.com suchen</button>
             </div>
          )}

          {activeTab === 'plan' && (
            <div className="space-y-6">
               <div className="flex items-start">
                  <div className="flex flex-col items-center mr-4">
                     <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                     <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                     <h4 className="font-bold text-lg mb-1">Ankunft & Erste Erkundung</h4>
                     <p className="text-gray-600 text-sm">Ankunft am Flughafen, Transfer zum Hotel und ein erster Spaziergang durch die Altstadt.</p>
                  </div>
               </div>
               <div className="flex items-start">
                  <div className="flex flex-col items-center mr-4">
                     <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
                     <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                     <h4 className="font-bold text-lg mb-1">Kultur & Kulinarik</h4>
                     <p className="text-gray-600 text-sm">Besuch der wichtigsten Sehenswürdigkeiten und Abendessen in einem lokalen Restaurant.</p>
                  </div>
               </div>
               <div className="flex items-center justify-center py-4">
                 <button className="text-primary font-medium border border-primary px-4 py-2 rounded-full hover:bg-blue-50">
                   Detaillierten Plan generieren ✨
                 </button>
               </div>
            </div>
          )}

        </div>

        {/* Sidebar Sticky */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-32">
             <h3 className="text-lg font-bold mb-4 font-heading border-b pb-2">Reise Zusammenfassung</h3>
             
             <div className="space-y-4 mb-6">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-500">Zeitraum</span>
                 <span className="font-medium">März 2025</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-500">Reisende</span>
                 <span className="font-medium">2 Personen</span>
               </div>
               <div className="border-t pt-4 flex justify-between items-center">
                 <span className="font-bold text-lg text-dark">Total ca.</span>
                 <span className="font-bold text-xl text-primary">{trip.priceEstimate}</span>
               </div>
             </div>

             <div className="space-y-3">
               <button className="w-full bg-primary text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/20 hover:bg-[#152e4d] transition">
                 Reise buchen
               </button>
               <div className="flex gap-2">
                 <button className="flex-1 border border-gray-200 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center">
                   <Heart size={18} className="mr-2" /> Merken
                 </button>
                 <button className="flex-1 border border-gray-200 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center">
                   <Share2 size={18} className="mr-2" /> Teilen
                 </button>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TripDetails;
