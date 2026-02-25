import React, { useState, useEffect } from 'react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashPhase, setSplashPhase] = useState('blank');

  useEffect(() => {
    // Slower, more premium timing for the hackathon demo
    const timer1 = setTimeout(() => setSplashPhase('expanding'), 2500);
    const timer2 = setTimeout(() => setSplashPhase('content'), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Roboto:wght@400;500&display=swap');
      `}</style>

      {showSplash ? (
        /* --- SCREEN 1: THE REFINED SPLASH (FULL SCREEN) --- */
        <div className="h-screen w-full flex flex-col items-center justify-between relative transition-colors duration-1000">
          
          {/* THE EXPANDING ORANGE CIRCLE */}
          <div 
            className={`absolute rounded-full bg-[#CC5500] transition-all duration-[2000ms] ease-in-out z-0
              ${splashPhase === 'blank' ? 'w-0 h-0 opacity-0' : ''}
              ${splashPhase === 'expanding' || splashPhase === 'content' ? 'w-[450vmax] h-[450vmax] opacity-100' : ''}
            `}
          />

          {splashPhase === 'content' && (
            <>
              {/* Brand Block - Positioned for full screen impact */}
              <div className="flex-1 flex flex-col items-center justify-center w-full z-10 -mt-16 animate-in fade-in duration-1000">
                
                {/* Logo - Stable Version (No blinking) */}
                <div className="relative mb-6 w-full max-w-[300px] md:max-w-[350px] flex justify-center">
                  <div className="absolute inset-0 bg-white/5 rounded-full scale-110 blur-3xl" />
                  <img 
                    src="/logo.png" 
                    alt="VeldAI Logo" 
                    className="w-full h-auto object-contain drop-shadow-2xl"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400?text=VELDAI+LOGO'; }}
                  />
                </div>

                {/* Text Block */}
                <div className="flex flex-col items-center animate-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
                  {/* VELDAI Text */}
                  <h1 className="text-[#007A4D] text-6xl md:text-7xl font-[900] tracking-tighter drop-shadow-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                    VELDAI
                  </h1>
                  
                  {/* Inclusive Text */}
                  <p className="text-white/80 text-sm md:text-base font-light tracking-[0.15em] uppercase mt-6" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Inclusive Agricultural Intelligence
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="w-full flex flex-col items-center max-w-[280px] z-10 animate-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both mb-12">
                <button 
                  onClick={() => setShowSplash(false)}
                  className="w-full max-w-[220px] bg-white text-[#CC5500] py-3.5 rounded-full text-base font-medium tracking-wide shadow-xl active:scale-95 transition-all cursor-pointer hover:bg-white/95"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Let's Get Started
                </button>
                
                <p className="text-white/30 text-[9px] mt-6 uppercase tracking-[0.5em] font-bold">
                  Veld-Ready
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        /* --- SCREEN 2: VELD-TALK (HOME) (FULL SCREEN) --- */
        <div className="h-screen w-full bg-[#F9F5FF] flex flex-col p-8 animate-in fade-in duration-700">
          <header className="mt-8">
            <h2 className="text-[#1B1B1B] text-4xl font-[900] tracking-tight mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                Molo!
            </h2>
            <p className="text-[#1B1B1B]/60 text-lg font-medium tracking-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
                How can I help you today?
            </p>
            <div className="h-1 w-10 bg-[#CC5500] mt-4 rounded-full" />
          </header>

          <div className="flex-1 flex items-center justify-center">
             <div className="flex items-end gap-2 h-24">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i}
                    className="w-2.5 bg-[#B693FE] rounded-full animate-pulse"
                    style={{ 
                      height: `${30 + Math.random() * 70}%`,
                      animationDelay: (i * 0.15) + 's',
                      animationDuration: '1.2s'
                    }}
                  />
                ))}
             </div>
          </div>

          <div className="flex flex-col items-center pb-8">
            <button className="w-20 h-20 bg-[#CC5500] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-90 transition-all border-[4px] border-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0 v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </button>
            <p className="text-[#1B1B1B]/30 text-[10px] mt-4 font-bold uppercase tracking-[0.3em]" style={{ fontFamily: 'Roboto, sans-serif' }}>Tap to speak</p>
          </div>
        </div>
      )}
    </main>
  );
}