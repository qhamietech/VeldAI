/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Camera, 
  ArrowLeft, 
  Leaf, 
  Wifi,
  ChevronRight,
  X,
  Volume2,
  CloudUpload,
  CheckCircle2
} from 'lucide-react';

// --- Types ---
type Screen = 'splash' | 'voice' | 'scout' | 'diagnosis' | 'offline';
type Language = 'en' | 'xh' | 'sw' | 'sn';
type SyncStatus = 'idle' | 'pending' | 'syncing' | 'success';

interface Translation {
  molo: string;
  help: string;
  subHelp: string;
  listening: string;
  sttTranscript: string;
  sttEnglish: string;
  switchScout: string;
  scoutTitle: string;
  noPhoto: string;
  selectGallery: string;
  healthStatus: string;
  scanning: string;
  photoLoaded: string;
  selectPhotoPrompt: string;
  diagnosisTitle: string;
  affected: string;
  growthRate: string;
  growthValue: string;
  quarantine: string;
  treatment: string;
  biosecurity: string;
  voiceHelp: string;
  pdfTitles: string[];
}

const translations: Record<Language, Translation> = {
  en: {
    molo: "Hello!", help: "How can I help you today?", subHelp: "I am here to assist you with your crops.",
    listening: "Listening...", 
    sttTranscript:"Thhere are rust spots on my corn leaves",
    sttEnglish: "",
    switchScout: "Switch to Digital Scout", scoutTitle: "Digital Scout",
    noPhoto: "No photo selected", selectGallery: "Select from Gallery", healthStatus: "Health Status",
    scanning: "Scanning...", photoLoaded: "Photo loaded. Press the camera button to start the diagnostic scan.",
    selectPhotoPrompt: "First, select a photo of your maize leaf from your gallery.",
    diagnosisTitle: "Diagnosis: Common Rust", affected: "45% Affected", growthRate: "Growth Rate",
    growthValue: "15% per day",
    quarantine: "Quarantine Instructions", treatment: "Localized Treatment", biosecurity: "Bio-security Alerts",
    voiceHelp: "Voice Help",
    pdfTitles: ['Common Viruses', 'Quarantine Steps', 'Localized Treatments', 'Bio-security Alerts']
  },
  xh: {
    molo: "Molo! (Hello)", help: "Ndingakunceda njani? (How can I help?)", subHelp: "Assisting you with your crops.",
    listening: "Ndiphulaphule... (Listening)", 
    sttTranscript: "Ndibona amachokoza abomvu ematshatshini ombona wam...",
    sttEnglish: "There are rust spots on my corn leaves",
    switchScout: "Tshintshela ku-Digital Scout", scoutTitle: "Digital Scout",
    noPhoto: "Akukho photo ikhetiweyo", selectGallery: "Khetha kwi-Galari", healthStatus: "Isimo seMpilo",
    scanning: "Iyaskena...", photoLoaded: "Photo loaded. Press camera to start diagnostic scan.",
    selectPhotoPrompt: "First, select a photo of your maize leaf from your gallery.",
    diagnosisTitle: "Uxilongo (Diagnosis): Common Rust", affected: "45% Affected", growthRate: "Growth Rate",
    growthValue: "15% ngosuku",
    quarantine: "Imiyalelo (Quarantine)", treatment: "Unyango (Treatment)", biosecurity: "Bio-security Alerts",
    voiceHelp: "Voice Help",
    pdfTitles: ['Common Viruses', 'Quarantine', 'Treatments', 'Security']
  },
  sw: {
    molo: "Habari! (Hello)", help: "Nawezaje kukusaidia? (How can I help?)", subHelp: "Assisting you with your crops.",
    listening: "Inasikiliza... (Listening)", 
    sttTranscript: "Kuna madoa ya kutu kwenye majani yangu ya mahindi",
    sttEnglish: "There are rust spots on my corn leaves",
    switchScout: "Badili hadi Digital Scout", scoutTitle: "Digital Scout",
    noPhoto: "No photo selected", selectGallery: "Chagua kutoka Galari", healthStatus: "Hali ya Afya",
    scanning: "Inachanganua...", photoLoaded: "Photo loaded. Press camera to start diagnostic scan.",
    selectPhotoPrompt: "First, select a photo of your maize leaf from your gallery.",
    diagnosisTitle: "Utambuzi (Diagnosis): Common Rust", affected: "45% Affected", growthRate: "Growth Rate",
    growthValue: "15% kwa siku",
    quarantine: "Maagizo (Quarantine)", treatment: "Matibabu (Treatment)", biosecurity: "Bio-security Alerts",
    voiceHelp: "Msaada wa Sauti",
    pdfTitles: ['Common Viruses', 'Quarantine', 'Treatments', 'Security']
  },
  sn: {
    molo: "Mhoro! (Hello)", help: "Ndingakubatsira sei? (How can I help?)", subHelp: "Assisting you with your crops.",
    listening: "Kuteerera... (Listening)", 
    sttTranscript: "Pane mavara ane ngura pamashizha angu echibage",
    sttEnglish: "There are rust spots on my corn leaves",
    switchScout: "Chinja kuenda kuDigital Scout", scoutTitle: "Digital Scout",
    noPhoto: "No photo selected", selectGallery: "Sarudza kubva muGalari", healthStatus: "Mamiriro eHutano",
    scanning: "Kuongorora...", photoLoaded: "Photo loaded. Press camera to start diagnostic scan.",
    selectPhotoPrompt: "First, select a photo of your maize leaf from your gallery.",
    diagnosisTitle: "Kuongorora (Diagnosis): Common Rust", affected: "45% Affected", growthRate: "Growth Rate",
    growthValue: "15% pazuva",
    quarantine: "Mirayiridzo (Quarantine)", treatment: "Kurapa (Treatment)", biosecurity: "Bio-security Alerts",
    voiceHelp: "Rubatsiro rweInzwi",
    pdfTitles: ['Common Viruses', 'Quarantine', 'Treatments', 'Security']
  }
};

// --- Components ---

const TypewriterText = ({ text, delay = 100, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const hasCompleted = useRef(false);
  
  useEffect(() => {
    setDisplayedText("");
    hasCompleted.current = false;
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        if (onComplete && !hasCompleted.current) {
          hasCompleted.current = true;
          onComplete();
        }
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

const Logo = ({ className = "", size = "md", color = "#2D6A4F", textColor }: { className?: string, size?: 'sm' | 'md' | 'lg', color?: string, textColor?: string }) => {
  const logoSrc = "/logo.png"; 
  const imgSize = size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-24 h-24' : 'w-16 h-16';

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <div className={`relative flex items-center justify-center ${imgSize}`}>
        <img 
          src={logoSrc} 
          alt="VELDAI Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className={`${size === 'sm' ? 'text-xl' : 'text-4xl'} font-black tracking-tighter mt-1 uppercase`} style={{ color: textColor || color }}>VELDAI</h1>
    </div>
  );
};

const Waveform = ({ isListening, isSpeaking }: { isListening: boolean, isSpeaking: boolean }) => {
  const shouldAnimate = isListening && !isSpeaking;

  return (
    <div className="flex items-center justify-center h-12 w-full px-8">
      <svg viewBox="0 0 200 60" className="w-full h-full">
        <motion.path
          d="M0 30 Q25 30 50 30 T100 30 T150 30 T200 30"
          stroke="#9D7BFF"
          strokeWidth="3"
          fill="transparent"
          animate={shouldAnimate ? {
            d: [
              "M0 30 Q25 10 50 30 T100 30 T150 50 T200 30",
              "M0 30 Q25 50 50 30 T100 10 T150 30 T200 30",
              "M0 30 Q25 30 50 10 T100 50 T150 30 T200 30",
              "M0 30 Q25 30 50 30 T100 30 T150 30 T200 30",
            ]
          } : {
            d: "M0 30 Q25 30 50 30 T100 30 T150 30 T200 30"
          }}
          transition={{
            duration: 2,
            repeat: shouldAnimate ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [language, setLanguage] = useState<Language>('en');
  const [isListening, setIsListening] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  
  // --- Online Detection & Sync Logic ---
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const listeningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync effect: Trigger upload logic when internet returns
  useEffect(() => {
    if (isOnline && syncStatus === 'pending') {
      setSyncStatus('syncing');
      // Simulate network upload
      setTimeout(() => {
        setSyncStatus('success');
        // Clear success message after 3 seconds
        setTimeout(() => setSyncStatus('idle'), 3000);
      }, 2500);
    }
  }, [isOnline, syncStatus]);

  const t = translations[language];

  useEffect(() => {
    setShowTranslation(false);
  }, [language, isListening]);

  useEffect(() => {
    if (isListening) {
      listeningTimerRef.current = setTimeout(() => {
        setIsListening(false);
      }, 60000);
    } else {
      if (listeningTimerRef.current) clearTimeout(listeningTimerRef.current);
    }
    return () => { if (listeningTimerRef.current) clearTimeout(listeningTimerRef.current); };
  }, [isListening]);

  const screenVariants = {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  const handlePlayAudio = () => {
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 5000);
  };

  const handleNextAction = () => {
    setIsListening(false);
    if (!isOnline) {
      setSyncStatus('pending');
      alert("No internet. Report saved to PawSOS Local. It will upload once you are back online.");
    }
    setCurrentScreen('scout');
  };

  const startScan = () => {
    if (!selectedPhoto) return;
    setIsScanning(true);
    setTimeout(() => {
      setCurrentScreen('diagnosis');
      setIsScanning(false);
      setSelectedPhoto(false);
    }, 3000);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <motion.div key="splash" className="absolute inset-0 bg-white flex flex-col items-center justify-center overflow-hidden">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 10 }} transition={{ duration: 1.2, ease: "circIn" }} className="absolute w-64 h-64 bg-[#D95400] rounded-full z-0" />
            <div className="relative z-10 flex flex-col items-center text-center px-8">
              <motion.div initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, type: "spring", stiffness: 100, damping: 15 }} className="mb-4">
                <Logo size="lg" color="#2D6A4F" textColor="#2D6A4F" />
                <p className="text-white font-light text-[10px] mt-2 uppercase tracking-widest">Inclusive agricultural Intelligence</p>
              </motion.div>
              
              <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.2, duration: 0.5 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentScreen('voice')} className="bg-white text-[#D95400] px-8 py-3 rounded-full font-bold text-sm shadow-xl mt-8">
                Let's Get Started
              </motion.button>
            </div>
          </motion.div>
        );

      case 'voice':
        return (
          <motion.div key="voice" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 bg-[#F5F5F7] flex flex-col p-5 overflow-hidden justify-between">
            <div className="flex flex-col z-20">
              <div className="flex justify-between items-start">
                <Logo size="sm" className="items-start" />
                <div className="flex items-center gap-2 relative">
                  {/* Enhanced Online/Offline Toggle Visual */}
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCurrentScreen('offline')} className="w-9 h-9 bg-white shadow-sm border border-neutral-100 rounded-full flex items-center justify-center relative">
                    <Wifi size={16} className={isOnline ? "text-green-600" : "text-neutral-300"} />
                    <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                  </motion.button>
                  <div className="relative">
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowLangDropdown(!showLangDropdown)} className="h-9 px-3 bg-white shadow-sm border border-neutral-100 rounded-full flex items-center gap-2 text-[#2D6A4F] font-bold text-[10px]">
                      {language.toUpperCase()}
                      <ChevronRight size={12} className={showLangDropdown ? "-rotate-90" : "rotate-90"} />
                    </motion.button>
                    <AnimatePresence>
                      {showLangDropdown && (
                        <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-2 w-28 bg-white rounded-xl shadow-xl border border-neutral-100 py-1 z-50">
                          {['en', 'xh', 'sw', 'sn'].map((lang) => (
                            <button key={lang} onClick={() => { setLanguage(lang as Language); setShowLangDropdown(false); }} className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-neutral-50 ${language === lang ? 'text-[#D95400]' : 'text-neutral-600'}`}>
                              {lang === 'en' ? 'English' : lang === 'xh' ? 'IsiXhosa' : lang === 'sw' ? 'Swahili' : 'Shona'}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <motion.div 
                animate={{ 
                  scale: isListening ? 0.85 : 1,
                  originX: 0,
                  y: isListening ? -5 : 0
                }}
                className="mt-4"
              >
                <h2 className="text-xl font-bold leading-tight">
                  <span className="text-[#2D6A4F]">{t.molo}</span><br />
                  <span className="text-[#D95400]">{t.help}</span>
                </h2>
                <p className="text-[11px] text-neutral-500 mt-1">{t.subHelp}</p>
              </motion.div>

              {/* PENDING UPLOAD CARD (The New Feature) */}
              <AnimatePresence>
                {syncStatus !== 'idle' && !isListening && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-3 rounded-2xl border flex items-center gap-3 ${
                      syncStatus === 'pending' ? 'bg-orange-50 border-orange-100 text-orange-800' :
                      syncStatus === 'syncing' ? 'bg-blue-50 border-blue-100 text-blue-800' :
                      'bg-green-50 border-green-100 text-green-800'
                    }`}>
                      <div className="shrink-0">
                        {syncStatus === 'pending' && <Wifi size={18} className="animate-pulse" />}
                        {syncStatus === 'syncing' && <CloudUpload size={18} className="animate-bounce" />}
                        {syncStatus === 'success' && <CheckCircle2 size={18} />}
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-black uppercase tracking-tight">
                          {syncStatus === 'pending' && "Waiting for Signal..."}
                          {syncStatus === 'syncing' && "Syncing to Cloud..."}
                          {syncStatus === 'success' && "Upload Success!"}
                        </p>
                        <p className="text-[9px] opacity-70">
                          {syncStatus === 'pending' && "1 report saved locally"}
                          {syncStatus === 'syncing' && "Connecting to PawSOS servers"}
                          {syncStatus === 'success' && "Database is up to date"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="w-full flex flex-col items-center justify-start pt-2 overflow-hidden">
                <Waveform isListening={isListening} isSpeaking={isSpeaking} />
                <AnimatePresence>
                  {isListening && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="w-full px-2 mt-1 h-auto flex flex-col">
                      <div className="stt-card bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/50 mb-1 h-auto">
                        <div className="flex items-center justify-between mb-1 bg-white/50 py-1 backdrop-blur-sm z-10">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">STT & Translation</span>
                          </div>
                          <button onClick={handlePlayAudio} className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold transition-colors ${isSpeaking ? 'bg-orange-100 text-[#D95400]' : 'bg-neutral-100 text-neutral-500'}`}>
                            <Volume2 size={10} className={isSpeaking ? "animate-bounce" : ""} /> {isSpeaking ? "Speaking..." : "Play Audio"}
                          </button>
                        </div>
                        <p className="text-[11px] text-neutral-700 font-medium italic leading-snug">
                          "
                          <TypewriterText 
                              key={`${language}-${isListening}`}
                              text={t.sttTranscript} 
                              delay={language === 'en' ? 70 : 50} 
                              onComplete={() => setShowTranslation(true)}
                            />"
                        </p>
                        
                        <AnimatePresence>
                          {showTranslation && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }} 
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-2 pt-2 border-t border-neutral-100 flex justify-between items-end"
                            >
                              <div>
                                {language !== 'en' && (
                                  <>
                                    <p className="text-[8px] text-[#D95400] font-bold uppercase">English:</p>
                                    <p className="text-[10px] text-neutral-500 italic">"{t.sttEnglish}"</p>
                                  </>
                                )}
                              </div>
                              <motion.button whileTap={{ scale: 0.9 }} onClick={handleNextAction} className="bg-[#2D6A4F] text-white px-3 py-1 rounded-full text-[9px] font-bold flex items-center gap-1 shrink-0">
                                Next <ChevronRight size={10} />
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="text-[#D95400] text-center font-bold text-[10px] tracking-widest uppercase mt-2">{t.listening}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="relative flex flex-col items-center gap-4 pb-8 min-h-[160px] justify-end">
              <div className="relative">
                <AnimatePresence>
                  {isListening && (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: [1, 1.2, 1], opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-[#D95400]/20 rounded-full blur-2xl" />
                  )}
                </AnimatePresence>
                <motion.button 
                  whileTap={{ scale: 0.9 }} 
                  onClick={() => setIsListening(!isListening)} 
                  className={`relative w-24 h-24 rounded-full shadow-xl flex items-center justify-center text-white transition-all z-10 ${isListening ? 'bg-[#D95400]' : 'bg-[#2D6A4F]'}`}
                >
                  <Mic size={36} />
                </motion.button>
              </div>

              {!isListening && (
                <motion.button 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  whileTap={{ scale: 0.95 }} 
                  onClick={() => { setIsListening(false); setCurrentScreen('scout'); }} 
                  className="flex items-center gap-2 font-bold text-[10px] text-[#2D6A4F] bg-white px-5 py-2 rounded-full shadow-sm"
                >
                  <Camera size={14} /> {t.switchScout}
                </motion.button>
              )}

              <div className="absolute left-0 bottom-8">
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setCurrentScreen('splash')} className="w-8 h-8 bg-white shadow-md border border-neutral-100 rounded-full flex items-center justify-center">
                  <ArrowLeft size={16} className="text-[#D95400]" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        );

      case 'scout':
        return (
          <motion.div key="scout" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 bg-[#1A1A1A] flex flex-col p-6 overflow-hidden">
              <div className="flex items-center justify-between mt-2">
                <h2 className="text-xl font-bold text-white">{t.scoutTitle}</h2>
                <button onClick={() => setCurrentScreen('voice')} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white"><ArrowLeft size={18} /></button>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center gap-4">
                <div className="w-52 h-52 border-2 border-white/30 rounded-[2rem] relative overflow-hidden bg-neutral-900 flex items-center justify-center">
                  {selectedPhoto ? (
                    <img src="/rust.png" alt="Maize" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-white/40 flex flex-col items-center gap-2"><Camera size={40} /><span className="text-[10px]">{t.noPhoto}</span></div>
                  )}
                  {isScanning && (
                    <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-1 bg-green-400 shadow-[0_0_20px_rgba(74,222,128,1)] z-30" />
                  )}
                </div>
                {!selectedPhoto && (
                  <button onClick={() => setSelectedPhoto(true)} className="bg-white/10 text-white px-6 py-2 rounded-xl border border-white/20 text-xs">{t.selectGallery}</button>
                )}
              </div>
              <div className="bg-white rounded-[2rem] p-5 mb-2">
                <h3 className="text-lg font-bold">{t.healthStatus}</h3>
                <p className="text-neutral-500 text-[10px] mt-1">{selectedPhoto ? t.photoLoaded : t.selectPhotoPrompt}</p>
                <div className="mt-4 flex justify-center">
                  <button disabled={!selectedPhoto || isScanning} onClick={startScan} className={`w-14 h-14 rounded-full flex items-center justify-center text-white ${selectedPhoto ? 'bg-[#D95400]' : 'bg-neutral-300'}`}><Camera size={24} /></button>
                </div>
              </div>
          </motion.div>
        );

      case 'diagnosis':
        return (
          <motion.div key="diagnosis" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 bg-white flex flex-col overflow-hidden">
            <div className="h-1/3 relative shrink-0">
              <img src="/rust.png" className="w-full h-full object-cover" alt="Diagnosis" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent h-20" />
              <button onClick={() => setCurrentScreen('scout')} className="absolute top-6 right-6 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white z-50"><X size={18} /></button>
            </div>
            
            <div className="flex-1 -mt-8 bg-white rounded-t-[2.5rem] p-6 relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] overflow-y-auto diagnosis-content flex flex-col">
              <h2 className="text-2xl font-black text-neutral-800">{t.diagnosisTitle}</h2>
              <div className="bg-orange-500 w-fit px-3 py-1 rounded-full mt-2 text-white text-[11px] font-black uppercase tracking-wider shrink-0">{t.affected}</div>
              
              <div className="space-y-3 mt-4 flex-grow">
                <div className="p-3 bg-red-50 rounded-2xl border border-red-100">
                  <h4 className="text-[10px] font-black text-red-800 uppercase tracking-widest mb-1">{t.growthRate}</h4>
                  <p className="text-xs font-bold text-red-700">{t.growthValue}</p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
                  <h4 className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-1">{t.quarantine}</h4>
                  <p className="text-xs font-bold text-blue-700">Isolate affected plants immediately.</p>
                </div>

                <div className="p-3 bg-green-50 rounded-2xl border border-green-100">
                  <h4 className="text-[10px] font-black text-green-800 uppercase tracking-widest mb-1">{t.treatment}</h4>
                  <p className="text-xs font-bold text-green-700">Apply copper-based fungicides.</p>
                </div>

                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100">
                  <h4 className="text-[10px] font-black text-purple-800 uppercase tracking-widest mb-1">{t.biosecurity}</h4>
                  <p className="text-xs font-bold text-purple-700">Reporting to local authorities recommended.</p>
                </div>
              </div>
              
              <button onClick={() => setCurrentScreen('voice')} className="w-full bg-[#2D6A4F] text-white font-black py-3 rounded-2xl mt-4 flex items-center justify-center gap-3 text-xs shadow-lg active:scale-95 transition-transform shrink-0">
                <Mic size={18} /> {t.voiceHelp}
              </button>
            </div>
          </motion.div>
        );

      case 'offline':
        return (
          <motion.div key="offline" variants={screenVariants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 bg-[#F5F5F7] flex flex-col p-6 overflow-hidden">
             <button onClick={() => setCurrentScreen('voice')} className="w-9 h-9 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm"><ArrowLeft size={18} /></button>
             <h2 className="text-lg font-bold mb-4">Offline Resources</h2>
             <div className="grid grid-cols-2 gap-3">
                {t.pdfTitles.map((item, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-2xl border border-neutral-100 flex flex-col gap-2 shadow-sm">
                    <div className="w-7 h-7 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><Leaf size={14} /></div>
                    <h4 className="text-[10px] font-bold leading-tight">{item}</h4>
                    <span className="text-[8px] text-neutral-400">PDF • 2.4MB</span>
                  </div>
                ))}
             </div>
          </motion.div>
        );
      
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 p-2">
      <style>{`
        * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        *::-webkit-scrollbar {
          display: none;
        }
        .diagnosis-content {
          overflow-y: scroll;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .diagnosis-content::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <div className="w-[320px] h-[680px] max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-[6px] border-neutral-900 relative">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </div>
    </div>
  );
}