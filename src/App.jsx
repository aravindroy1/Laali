import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Fireworks } from '@fireworks-js/react';
import Petals from './components/Petals';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import BirthdayNote from './components/BirthdayNote';
import Gallery from './components/Gallery';
import VideoMemories from './components/VideoMemories';
import Timeline from './components/Timeline';
import Footer from './components/Footer';
import Loader from './components/Loader';
import MusicPlayer from './components/MusicPlayer';
import PasswordModal from './components/PasswordModal';
import MagicCursor from './components/MagicCursor';
import SecretWorld from './components/SecretWorld';
import Companion from './components/Companion';

function App() {
  const targetDate = new Date('2026-05-22T00:00:00').getTime();
  
  const [appState, setAppState] = useState(() => {
    return new Date().getTime() >= targetDate ? 'loader' : 'countdown';
  });
  
  const [showFireworks, setShowFireworks] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [bgImages, setBgImages] = useState({ hero1: null, hero2: null, hero3: null });

  const { scrollYProgress } = useScroll();
  
  // Parallax and fade effects for backgrounds
  const opacityHero1 = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const opacityHero2 = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const opacityHero3 = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  // Handle Loader Timeout
  useEffect(() => {
    if (appState === 'loader') {
      const timer = setTimeout(() => {
        setAppState('website');
        setShowFireworks(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  // Handle Fireworks Duration
  useEffect(() => {
    if (showFireworks) {
      const timer = setTimeout(() => {
        setShowFireworks(false);
      }, 8000); // 8 seconds of full fireworks
      return () => clearTimeout(timer);
    }
  }, [showFireworks]);

  useEffect(() => {
    // Load secondary hero images for parallax background
    const loadBgs = async () => {
      const heroModules = import.meta.glob('/src/assets/public_photos/hero*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });
      const files = Object.keys(heroModules).reduce((acc, key) => {
        const name = key.toLowerCase();
        if (name.includes('hero2')) {
          acc.hero2 = heroModules[key];
        } else if (name.includes('hero3')) {
          acc.hero3 = heroModules[key];
        } else if (name.includes('hero')) {
          acc.hero1 = heroModules[key];
        }
        return acc;
      }, { hero1: null, hero2: null, hero3: null });
      setBgImages(files);
    };
    
    loadBgs();
  }, []);

  const handleSecretTrigger = () => {
    if (!isUnlocked) setShowPasswordModal(true);
  };

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    setShowPasswordModal(false);
  };

  const handleCountdownFinish = () => {
    setAppState('loader');
  };

  return (
    <div className="relative min-h-screen bg-transparent text-[#fff7fb] font-sans selection:bg-[#b85b7e] selection:text-white cursor-none">
      <MagicCursor />

      {/* Realistic Fireworks Component */}
      <AnimatePresence>
        {showFireworks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }} // Fades out slowly over 2 seconds
            className="fixed inset-0 z-[300] pointer-events-none"
          >
            <Fireworks
              options={{
                rocketsPoint: { min: 0, max: 100 },
                hue: { min: 300, max: 360 }, // Pinks and reds
                delay: { min: 5, max: 15 }, // Extremely fast firing
                speed: 3,
                acceleration: 1.05,
                friction: 0.96,
                gravity: 1.5,
                particles: 250, // Massive bursts
                traceLength: 4,
                traceSpeed: 10,
                explosion: 10, // Huge explosions
                intensity: 70, // Many fireworks at once
                flickering: 60, // Heavy crackling effect
                lineStyle: 'round',
                opacity: 0.6,
              }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {appState === 'countdown' && (
          <motion.div
            key="countdown-landing"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-[#0d070b] overflow-y-auto overflow-x-hidden"
          >
            <Countdown targetDate="2026-05-22T00:00:00" onBypass={handleCountdownFinish} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {appState === 'loader' && (
          <motion.div
            key="app-loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[150]"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Website Content - Fades in slowly after loader */}
      <AnimatePresence>
        {appState === 'website' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            {/* Dynamic Parallax Backgrounds */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#1a0f16]">
              {bgImages.hero1 && (
                <motion.div style={{ opacity: opacityHero1 }} className="absolute inset-0">
                  <motion.div 
                    style={{ scale: scaleBg }}
                    className="absolute inset-0 bg-cover bg-[center_25%] bg-no-repeat"
                    initial={{ backgroundImage: `url('${bgImages.hero1}')` }}
                  />
                  {/* Very light overlay for hero1 to match Hero.jsx */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f16] via-transparent to-[#1a0f16]/60" />
                  <div className="absolute inset-0 bg-black/20" />
                </motion.div>
              )}
              {bgImages.hero2 && (
                <motion.div style={{ opacity: opacityHero2 }} className="absolute inset-0">
                  <motion.img 
                    style={{ scale: scaleBg }}
                    src={bgImages.hero2} 
                    alt="Hero 2"
                    loading="lazy"
                    decoding="async"
                    className="absolute top-1/2 left-1/2 w-[100vh] h-[100vw] -translate-x-1/2 -translate-y-1/2 -rotate-90 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f16]/90 via-[#2c1a25]/50 to-[#1a0f16]/90" />
                </motion.div>
              )}
              {bgImages.hero3 && (
                <motion.div style={{ opacity: opacityHero3 }} className="absolute inset-0">
                  <motion.img 
                    style={{ scale: scaleBg }}
                    src={bgImages.hero3} 
                    alt="Hero 3"
                    loading="lazy"
                    decoding="async"
                    className="absolute top-1/2 left-1/2 w-[100vh] h-[100vw] -translate-x-1/2 -translate-y-1/2 -rotate-90 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f16] via-[#1a0f16]/80 to-transparent" />
                </motion.div>
              )}
            </div>

            <Petals />
            
            <AnimatePresence>
              {!isUnlocked && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                  <MusicPlayer />
                  <Companion />
                </motion.div>
              )}
            </AnimatePresence>
            
            <main className={`relative z-10 flex flex-col transition-opacity duration-1000 ${isUnlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <Hero />
              <BirthdayNote />
              <Gallery />
              <VideoMemories />
              <Timeline />
              <Footer onSecretTrigger={handleSecretTrigger} />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPasswordModal && (
          <PasswordModal 
            onClose={() => setShowPasswordModal(false)} 
            onSuccess={handleUnlockSuccess} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUnlocked && (
          <SecretWorld onClose={() => setIsUnlocked(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
