import { useState, useEffect } from 'react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashPhase, setSplashPhase] = useState('blank');

  useEffect(() => {
    const timer1 = setTimeout(() => setSplashPhase('expanding'), 2500);
    const timer2 = setTimeout(() => setSplashPhase('content'), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className={`min-h-screen overflow-hidden transition-colors duration-1000 ${splashPhase !== 'blank' && showSplash ? 'bg-[#CC5500]' : 'bg-white'}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Roboto:wght@400;500&display=swap');
        
        @keyframes drop-in {
          0% { transform: translateY(-50px); opacity: 0; }
          60% { transform: translateY(10px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-logo-drop {
          animation: drop-in 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.8s;
          opacity: 0;
        }
      `}</style>

      {showSplash ? (
        <div className="h-screen w-full flex flex-col items-center justify-between relative overflow-hidden px-6 py-10 md:py-16">
          
          <div 
            className={`absolute rounded-full bg-[#CC5500] transition-all duration-[2000ms] ease-in-out z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              ${splashPhase === 'blank' ? 'w-0 h-0' : 'w-[300vmax] h-[300vmax]'}
            `}
          />

          {splashPhase === 'content' && (
            <>
              {/* LOGO SECTION */}
              <div className="w-full flex justify-center z-10 animate-logo-drop pt-4">
                <div className="relative w-full max-w-[180px] md:max-w-[280px]">
                  <div className="absolute inset-0 bg-white/5 rounded-full scale-110 blur-3xl" />
                  <img 
                    src="/logo.png" 
                    alt="VeldAI Logo" 
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* BRANDING SECTION */}
              <div className="w-full flex flex-col items-center z-10 flex-grow justify-center mb-12 md:mb-20">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
                  <h1 className="text-[#007A4D] text-5xl md:text-7xl font-[900] tracking-tighter drop-shadow-sm leading-none" style={{ fontFamily: 'Inter, sans-serif' }}>
                    VELDAI
                  </h1>
                </div>
                
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150 fill-mode-both text-center mt-4">
                  <p className="text-white/90 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase whitespace-nowrap" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Inclusive Agricultural Intelligence
                  </p>
                </div>
              </div>

              {/* ACTION BUTTON SECTION - Lifted higher with pb-20/pb-24 */}
              <div className="w-full flex flex-col items-center z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both pb-20 md:pb-24">
                <button 
                  onClick={() => setShowSplash(false)}
                  className="w-full max-w-[220px] md:max-w-[280px] bg-white text-[#CC5500] py-4 rounded-full text-base md:text-lg font-medium tracking-wide shadow-xl active:scale-95 transition-all hover:bg-white/95"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Let's Get Started
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        /* --- HOME SCREEN --- */
        <div className="h-screen w-full bg-[#F9F5FF] flex flex-col p-8 md:p-16 animate-in fade-in duration-700">
          <header className="max-w-2xl mx-auto w-full">
            <h2 className="text-[#1B1B1B] text-4xl md:text-6xl font-[900] tracking-tight mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Molo!</h2>
            <p className="text-[#1B1B1B]/60 text-lg md:text-xl font-medium tracking-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>How can I help you today?</p>
            <div className="h-1.5 w-12 bg-[#CC5500] mt-4 rounded-full" />
          </header>

          <div className="flex-1 flex items-center justify-center">
             <div className="flex items-end gap-3 h-24 md:h-32">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-3 md:w-4 bg-[#B693FE] rounded-full animate-pulse" style={{ height: (30 + Math.random() * 70) + '%', animationDelay: (i * 0.15) + 's' }} />
                ))}
             </div>
          </div>

          <div className="flex flex-col items-center pb-8">
            <button className="w-24 h-24 bg-[#CC5500] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-90 transition-all border-[6px] border-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0 v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}