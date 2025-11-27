import React, { useState } from 'react';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import Dashboard from './pages/Dashboard';
import TripDetails from './pages/TripDetails';
import { AppRoute, User, TripProposal } from './types';
import { MOCK_USER } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [route, setRoute] = useState<AppRoute>(AppRoute.LANDING);
  const [selectedTrip, setSelectedTrip] = useState<TripProposal | null>(null);

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

  const renderContent = () => {
    switch (route) {
      case AppRoute.LANDING:
        return <LandingPage onNavigate={handleNavigate} />;
      
      case AppRoute.LOGIN:
      case AppRoute.REGISTER:
        // Simple auth mock for demo
        return (
          <div className="flex items-center justify-center h-[calc(100vh-64px)] bg-gray-50">
             <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
               <div className="w-12 h-12 bg-primary rounded-tr-xl rounded-bl-xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-xl">A</span>
               </div>
               <h2 className="text-2xl font-bold mb-2">{route === AppRoute.LOGIN ? 'Willkommen zurück' : 'Erstelle dein Konto'}</h2>
               <p className="text-gray-500 mb-8">Melde dich an, um deine Traumreise zu planen.</p>
               
               <div className="space-y-4">
                 <input type="email" placeholder="Email Adresse" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                 <input type="password" placeholder="Passwort" className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                 <button onClick={handleLogin} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                   {route === AppRoute.LOGIN ? 'Anmelden' : 'Registrieren'}
                 </button>
               </div>
               
               <p className="mt-6 text-sm text-gray-500">
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
        return <Dashboard onNavigate={handleNavigate} />;
      
      case AppRoute.TRIP_DETAILS:
        if (!selectedTrip) return <Dashboard onNavigate={handleNavigate} />;
        return <TripDetails trip={selectedTrip} onBack={() => setRoute(AppRoute.CHAT)} />;
        
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
