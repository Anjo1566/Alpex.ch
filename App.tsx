import React, { useState } from 'react';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import Dashboard from './pages/Dashboard';
import TripDetails from './pages/TripDetails';
import { AppRoute, User, TripProposal, Trip } from './types';
import { MOCK_USER, DEMO_TRIPS } from './constants';
import { Apple } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [route, setRoute] = useState<AppRoute>(AppRoute.LANDING);
  const [selectedTrip, setSelectedTrip] = useState<TripProposal | null>(null);
  const [savedTrips, setSavedTrips] = useState<Trip[]>(DEMO_TRIPS);

  const handleNavigate = (newRoute: AppRoute, data?: any) => {
    if (newRoute === AppRoute.TRIP_DETAILS && data) {
      setSelectedTrip(data);
    }
    setRoute(newRoute);
  };

  const handleLogin = () => {
    setUser(MOCK_USER);
    setRoute(AppRoute.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    setRoute(AppRoute.LANDING);
  };

  const handleSaveTrip = (proposal: TripProposal) => {
    // Convert proposal to full Trip format
    // In a real app, AI would probably generate full details or we'd fetch them
    const newTrip: Trip = {
      id: proposal.id,
      destination: proposal.destination,
      country: proposal.country,
      description: proposal.description,
      imageUrl: proposal.imageUrl,
      rating: proposal.rating,
      priceEstimate: proposal.priceEstimate,
      // Placeholder data for the full trip record
      startDate: '2025-05-01', 
      endDate: '2025-05-06',
      durationDays: 5,
      travelers: 2,
      reviewsCount: 100,
      priceFlight: 200,
      priceHotel: 500,
      priceActivities: 150,
      totalPrice: 850,
      highlights: [],
      status: 'draft'
    };
    
    setSavedTrips(prev => [newTrip, ...prev]);
  };

  const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );

  const renderContent = () => {
    switch (route) {
      case AppRoute.LANDING:
        return <LandingPage onNavigate={handleNavigate} />;
      
      case AppRoute.LOGIN:
      case AppRoute.REGISTER:
        return (
          <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
             <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
               <div className="w-12 h-12 bg-primary rounded-tr-xl rounded-bl-xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-xl">A</span>
               </div>
               <h2 className="text-2xl font-bold mb-2">{route === AppRoute.LOGIN ? 'Willkommen zurück' : 'Erstelle dein Konto'}</h2>
               <p className="text-gray-500 mb-8">Melde dich an, um deine Traumreise zu planen.</p>
               
               <div className="space-y-4">
                 <input type="email" placeholder="Email Adresse" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" />
                 <input type="password" placeholder="Passwort" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" />
                 <button onClick={handleLogin} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition shadow-lg shadow-primary/20">
                   {route === AppRoute.LOGIN ? 'Anmelden' : 'Registrieren'}
                 </button>
               </div>

               <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">oder weiter mit</span>
                  </div>
               </div>

               <div className="space-y-3">
                 <button className="w-full flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition">
                   <div className="mr-3"><GoogleIcon /></div>
                   {route === AppRoute.LOGIN ? 'Mit Google anmelden' : 'Mit Google registrieren'}
                 </button>
                 <button className="w-full flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition">
                   <Apple size={20} className="mr-3 text-black" />
                   {route === AppRoute.LOGIN ? 'Mit Apple anmelden' : 'Mit Apple registrieren'}
                 </button>
               </div>
               
               <p className="mt-8 text-sm text-gray-500">
                 {route === AppRoute.LOGIN ? 'Noch kein Konto?' : 'Bereits ein Konto?'}{' '}
                 <span onClick={() => setRoute(route === AppRoute.LOGIN ? AppRoute.REGISTER : AppRoute.LOGIN)} className="text-primary font-bold cursor-pointer hover:underline">
                   {route === AppRoute.LOGIN ? 'Registrieren' : 'Anmelden'}
                 </span>
               </p>
             </div>
          </div>
        );

      case AppRoute.CHAT:
        return <ChatPage onNavigate={handleNavigate} />;
      
      case AppRoute.DASHBOARD:
        return <Dashboard onNavigate={handleNavigate} trips={savedTrips} />;
      
      case AppRoute.TRIP_DETAILS:
        if (!selectedTrip) return <Dashboard onNavigate={handleNavigate} trips={savedTrips} />;
        return <TripDetails trip={selectedTrip} onBack={() => setRoute(AppRoute.CHAT)} onSave={handleSaveTrip} />;
        
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout 
      user={user} 
      currentRoute={route} 
      onNavigate={handleNavigate} 
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
