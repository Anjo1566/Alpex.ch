import React from 'react';
import { MessageSquare, Zap, Globe, Shield, CreditCard, ChevronDown } from 'lucide-react';
import { AppRoute } from '../types';

interface LandingPageProps {
  onNavigate: (route: AppRoute) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-primary text-sm font-semibold mb-6">
              <span className="mr-2">🇨🇭</span> Neu in der Schweiz
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-dark mb-6 leading-tight">
              Plane deine Traumreise <br/> <span className="text-primary">in Sekunden</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Alpex AI findet die perfekte Reise für dich - personalisiert, günstig und stressfrei.
              Erzähl uns einfach, wohin du willst.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => onNavigate(AppRoute.REGISTER)}
                className="px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg shadow-xl shadow-primary/20 hover:bg-[#152e4d] transition transform hover:-translate-y-1"
              >
                Kostenlos starten →
              </button>
              <button className="px-8 py-4 bg-white text-dark border border-gray-200 rounded-lg font-bold text-lg hover:bg-gray-50 transition">
                Demo ansehen
              </button>
            </div>
          </div>

          {/* Chat Mockup */}
          <div className="mt-16 mx-auto max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-up">
            <div className="bg-gray-50 px-4 py-3 border-b flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="ml-4 text-xs text-gray-400 font-mono">Alpex AI Chat</div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-end">
                <div className="bg-primary text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-md">
                  Romantischer Kurztrip, 4 Tage, unter 1000 Fr.
                </div>
              </div>
              <div className="flex justify-start">
                 <div className="bg-gray-100 text-dark rounded-2xl rounded-tl-none px-4 py-3 max-w-lg shadow-sm">
                  <p className="mb-2">Ich habe 3 perfekte Optionen für dich gefunden! 😍</p>
                  <div className="bg-white p-3 rounded-xl border mt-2 flex gap-4 hover:shadow-md transition cursor-pointer">
                    <img src="https://picsum.photos/seed/lisbon/100/100" className="w-16 h-16 rounded-lg object-cover" alt="Lisbon" />
                    <div>
                      <h4 className="font-bold text-primary">Lissabon, Portugal</h4>
                      <p className="text-sm text-gray-500">Flug + 4★ Hotel ab 890 CHF</p>
                      <div className="text-xs text-green-600 font-semibold mt-1">Beste Preis-Leistung</div>
                    </div>
                  </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-dark">So einfach geht's</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             <div className="text-center">
               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                 <MessageSquare size={32} />
               </div>
               <h3 className="text-xl font-bold mb-3">1. Erzähl uns was du willst</h3>
               <p className="text-gray-600">Beschreibe deine Traumreise in deinen eigenen Worten. Egal wie vage oder detailliert.</p>
             </div>
             <div className="text-center">
               <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
                 <Zap size={32} />
               </div>
               <h3 className="text-xl font-bold mb-3">2. AI findet das Beste</h3>
               <p className="text-gray-600">Alpex durchsucht tausende Optionen in Sekunden und kombiniert Flug & Hotel perfekt.</p>
             </div>
             <div className="text-center">
               <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-secondary">
                 <CreditCard size={32} />
               </div>
               <h3 className="text-xl font-bold mb-3">3. Buche mit einem Klick</h3>
               <p className="text-gray-600">Alle Buchungslinks an einem Ort. Speichere Pläne oder teile sie mit Freunden.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '🎯', title: 'Personalisiert', desc: 'Lernt deine Vorlieben kennen.' },
                { icon: '💰', title: 'Beste Preise', desc: 'Vergleicht Live-Preise.' },
                { icon: '🇨🇭', title: 'Swiss Quality', desc: 'Datenschutz & Zuverlässigkeit.' },
                { icon: '⚡', title: 'Blitzschnell', desc: 'Reiseplan in < 1 Minute.' },
                { icon: '🌍', title: 'Alles dabei', desc: 'Flug, Hotel & Aktivitäten.' },
                { icon: '💬', title: '24/7 Verfügbar', desc: 'Dein Berater schläft nie.' },
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-12">Preise</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-8 hover:border-primary transition duration-300">
               <h3 className="text-2xl font-bold mb-2">Free</h3>
               <div className="text-4xl font-bold mb-6">0 CHF</div>
               <ul className="space-y-4 text-left mb-8">
                 <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 3 Reiseplanungen / Monat</li>
                 <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Basis-Empfehlungen</li>
                 <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Email Support</li>
               </ul>
               <button onClick={() => onNavigate(AppRoute.REGISTER)} className="w-full py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition">Kostenlos starten</button>
            </div>
            {/* Premium */}
            <div className="flex-1 bg-primary text-white rounded-2xl p-8 transform md:-translate-y-4 shadow-2xl relative">
               <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULÄR</div>
               <h3 className="text-2xl font-bold mb-2">Premium</h3>
               <div className="text-4xl font-bold mb-6">9.90 CHF<span className="text-lg font-normal text-gray-300">/mtl</span></div>
               <ul className="space-y-4 text-left mb-8">
                 <li className="flex items-center"><span className="text-accent mr-2">✓</span> Unbegrenzte Planungen</li>
                 <li className="flex items-center"><span className="text-accent mr-2">✓</span> Exklusive Deals & Alarme</li>
                 <li className="flex items-center"><span className="text-accent mr-2">✓</span> Tagespläne & Routen</li>
                 <li className="flex items-center"><span className="text-accent mr-2">✓</span> Prioritäts-Support</li>
               </ul>
               <button className="w-full py-3 bg-secondary text-white font-bold rounded-lg hover:bg-opacity-90 transition">Premium werden</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
