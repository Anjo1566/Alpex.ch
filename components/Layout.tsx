import React from 'react';
import { Menu, X, User, LogOut, Map, MessageSquare, Home } from 'lucide-react';
import { AppRoute, User as UserType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: UserType | null;
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, currentRoute, onNavigate, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Different header for Landing vs App
  const isApp = currentRoute === AppRoute.CHAT || currentRoute === AppRoute.DASHBOARD || currentRoute === AppRoute.TRIP_DETAILS;

  return (
    <div className="min-h-screen flex flex-col font-sans text-dark">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isApp ? 'bg-white shadow-sm' : 'bg-transparent backdrop-blur-sm bg-white/80'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate(user ? AppRoute.DASHBOARD : AppRoute.LANDING)}>
              <div className="w-8 h-8 bg-primary rounded-tr-xl rounded-bl-xl mr-2 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">A</span>
              </div>
              <span className="font-heading font-bold text-xl text-primary">Alpex.ch</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {!isApp ? (
                <>
                  <button onClick={() => {}} className="text-gray-600 hover:text-primary font-medium">So funktioniert's</button>
                  <button onClick={() => {}} className="text-gray-600 hover:text-primary font-medium">Preise</button>
                  {user ? (
                    <button 
                      onClick={() => onNavigate(AppRoute.DASHBOARD)} 
                      className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-opacity-90 transition"
                    >
                      Zum Dashboard
                    </button>
                  ) : (
                    <>
                       <button onClick={() => onNavigate(AppRoute.LOGIN)} className="text-primary font-medium">Login</button>
                       <button 
                         onClick={() => onNavigate(AppRoute.REGISTER)} 
                         className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-opacity-90 transition shadow-lg shadow-primary/30"
                       >
                         Jetzt starten
                       </button>
                    </>
                  )}
                </>
              ) : (
                <>
                   <button 
                    onClick={() => onNavigate(AppRoute.CHAT)} 
                    className={`flex items-center space-x-2 font-medium ${currentRoute === AppRoute.CHAT ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}`}
                   >
                     <MessageSquare size={18} />
                     <span>Reiseplaner</span>
                   </button>
                   <button 
                    onClick={() => onNavigate(AppRoute.DASHBOARD)} 
                    className={`flex items-center space-x-2 font-medium ${currentRoute === AppRoute.DASHBOARD ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}`}
                   >
                     <Home size={18} />
                     <span>Meine Reisen</span>
                   </button>
                   <div className="h-6 w-px bg-gray-300 mx-2"></div>
                   <div className="flex items-center space-x-3">
                     <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        {user?.avatarUrl && <img src={user.avatarUrl} alt="User" className="w-full h-full object-cover" />}
                     </div>
                     <span className="text-sm font-medium">{user?.name}</span>
                     <button onClick={onLogout} className="text-gray-400 hover:text-red-500">
                       <LogOut size={18} />
                     </button>
                   </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg absolute w-full px-4 pt-2 pb-6 flex flex-col space-y-4">
             {!isApp ? (
                <>
                  <button className="text-left py-2 font-medium text-gray-700">So funktioniert's</button>
                  <button className="text-left py-2 font-medium text-gray-700">Preise</button>
                  <button onClick={() => onNavigate(AppRoute.LOGIN)} className="text-left py-2 font-medium text-primary">Login</button>
                  <button onClick={() => onNavigate(AppRoute.REGISTER)} className="bg-primary text-white py-3 rounded-lg font-medium text-center">Jetzt starten</button>
                </>
             ) : (
                <>
                  <button onClick={() => {onNavigate(AppRoute.CHAT); setIsMenuOpen(false);}} className="flex items-center space-x-2 py-3 text-gray-700">
                    <MessageSquare size={20} /> <span>Reiseplaner</span>
                  </button>
                  <button onClick={() => {onNavigate(AppRoute.DASHBOARD); setIsMenuOpen(false);}} className="flex items-center space-x-2 py-3 text-gray-700">
                    <Home size={20} /> <span>Meine Reisen</span>
                  </button>
                  <button onClick={onLogout} className="flex items-center space-x-2 py-3 text-red-500 border-t mt-2">
                    <LogOut size={20} /> <span>Abmelden</span>
                  </button>
                </>
             )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      {!isApp && (
        <footer className="bg-primary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-white rounded-tr-xl rounded-bl-xl mr-2 flex items-center justify-center">
                   <span className="text-primary font-heading font-bold text-lg">A</span>
                </div>
                <span className="font-heading font-bold text-xl">Alpex.ch</span>
              </div>
              <p className="text-gray-300 text-sm">Dein persönlicher AI Reiseberater aus der Schweiz.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-white">Über uns</a></li>
                <li><a href="#" className="hover:text-white">Karriere</a></li>
                <li><a href="#" className="hover:text-white">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="#" className="hover:text-white">Impressum</a></li>
                <li><a href="#" className="hover:text-white">Datenschutz</a></li>
                <li><a href="#" className="hover:text-white">AGB</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Folge uns</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer">IG</div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer">LI</div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            © 2025 Alpex.ch - Made with <span className="text-red-500">♥</span> in Switzerland
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
