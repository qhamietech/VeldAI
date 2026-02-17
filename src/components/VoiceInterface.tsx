import React, { useState } from 'react';
import { Mic, Camera, WifiOff, CheckCircle, X, Zap, Loader2 } from 'lucide-react';

const VoiceInterface: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [view, setView] = useState<'home' | 'camera'>('home');
  const [isScanning, setIsScanning] = useState(false);
  const [lastAdvice, setLastAdvice] = useState("Treat Maize Rust in 2 days");

  // Handle the "Capture" logic for MVP demo
  const handleCapture = () => {
    setIsScanning(true);
    // Simulate AI processing for 2 seconds to show the loader to judges
    setTimeout(() => {
      setLastAdvice("Nitrogen deficiency detected. Add fertilizer.");
      setIsScanning(false);
      setView('home');
    }, 2000);
  };

  if (view === 'home') {
    return (
      <div className="relative flex flex-col items-center justify-between h-screen bg-[#F5F5F0] p-6 pb-10 font-sans text-[#2D4F1E] max-w-md mx-auto shadow-2xl border-x border-gray-200 overflow-y-auto scrollbar-hide">
        {/* CSS to hide scrollbar while maintaining functionality */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        
        {/* LOGO ANCHOR */}
        <img 
          src="/logo.png" 
          alt="VeldAI" 
          className="absolute top-[-95px] left-[-40px] h-[300px] w-[300px] object-contain z-0 pointer-events-none opacity-80" 
        />

        {/* Top Bar: Offline Badge */}
        <div className="w-full flex justify-end items-start z-20">
          <div className="bg-[#5B8C5A] px-4 py-2 rounded-full flex items-center gap-2 text-[11px] font-black shadow-md mt-2">
            <span className="text-white tracking-widest">OFFLINE MODE</span>
            <WifiOff size={14} color="white" />
          </div>
        </div>

        {/* Main Interaction Area */}
        <div className="flex flex-col items-center gap-6 mt-12 z-10 text-center">
          <h2 className="text-2xl font-medium opacity-90">Good Morning, Farmer.</h2>
          
          {/* Animated Mic Button */}
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className={`relative flex items-center justify-center w-48 h-48 rounded-full transition-all duration-500 shadow-2xl
              ${isRecording ? 'bg-orange-600 scale-110' : 'bg-[#5B8C5A] hover:bg-[#4A7249]'}`}
          >
            {isRecording && (
              <span className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-75"></span>
            )}
            <Mic size={80} color="white" strokeWidth={1.5} />
          </button>

          <div>
            <p className="text-xl font-black uppercase tracking-[0.2em] text-[#2D4F1E]">
              {isRecording ? "Listening..." : "Tap to Speak"}
            </p>
          </div>

          {/* Navigation to Camera */}
          <button 
            onClick={() => setView('camera')}
            className="flex items-center gap-3 px-10 py-4 border-2 border-[#D97706] rounded-xl text-[#5B8C5A] font-black hover:bg-[#D97706] hover:text-white transition-all shadow-md active:scale-95 group"
          >
            <Camera size={24} className="text-[#5B8C5A] group-hover:text-white transition-colors" />
            SCAN YOUR CROP
          </button>
        </div>

        {/* Bottom Advice Card (Updates based on Scan) */}
        <div className="w-full bg-white p-6 rounded-3xl shadow-xl border border-[#DDE5D7] mt-8 z-10 transition-all duration-500">
          <div className="flex items-center gap-4">
            <div className="bg-[#DDE5D7] p-3 rounded-full">
              <CheckCircle className="text-[#5B8C5A]" size={28} />
            </div>
            <div>
              <p className="text-[10px] text-[#D97706] uppercase font-black tracking-widest">
                Last Advice (Synced)
              </p>
              <p className="text-xl font-medium text-[#5B8C5A] tracking-tight">
                {lastAdvice}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Camera View
  return (
    <div className="relative h-screen bg-black max-w-md mx-auto overflow-hidden flex flex-col items-center justify-between p-6">
      {/* Background / Scanning Feedback */}
      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
         {isScanning ? (
           <div className="flex flex-col items-center gap-4">
             <Loader2 className="text-[#D97706] animate-spin" size={48} />
             <p className="text-white font-bold tracking-widest animate-pulse">ANALYZING CROP...</p>
           </div>
         ) : (
           <p className="text-white/20 text-sm font-mono uppercase tracking-widest">Camera Feed Initializing...</p>
         )}
         
         {/* Viewfinder Frame */}
         <div className={`absolute w-64 h-64 border-2 border-[#D97706] rounded-3xl transition-all duration-500 
            ${isScanning ? 'opacity-100 scale-110 border-white' : 'opacity-50 scale-100'}`}>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl"></div>
         </div>
      </div>

      {/* Top Controls */}
      <div className="w-full flex justify-between items-center z-10">
        <button 
          onClick={() => setView('home')} 
          className="p-3 bg-white/10 rounded-full text-white backdrop-blur-md hover:bg-white/20"
        >
          <X size={24} />
        </button>
        <div className="bg-[#D97706] px-4 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1 shadow-lg">
          <Zap size={12} fill="white" />
          AI ANALYZER ACTIVE
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full flex flex-col items-center gap-6 z-10 pb-10">
        <p className="text-white text-xs font-medium bg-black/40 px-4 py-2 rounded-lg backdrop-blur-sm">
          {isScanning ? "Processing Leaf Data..." : "Align the crop leaf within the frame"}
        </p>
        <button 
          onClick={handleCapture}
          disabled={isScanning}
          className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 bg-transparent active:scale-90 transition-all 
            ${isScanning ? 'opacity-20 cursor-not-allowed' : 'hover:scale-105'}`}
        >
          <div className="w-full h-full bg-white rounded-full"></div>
        </button>
      </div>
    </div>
  );
};

export default VoiceInterface;