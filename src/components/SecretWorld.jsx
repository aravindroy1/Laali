import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Music, VolumeX } from 'lucide-react';
import PrivateAlbums from './PrivateAlbums';

const SecretWorld = ({ onClose }) => {
  const [transitionComplete, setTransitionComplete] = useState(false);
  const [bgImage, setBgImage] = useState(null);
  const [bubuImgs, setBubuImgs] = useState({ hang: null, bubu3: null });
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    // Stop public background music if it is playing
    window.dispatchEvent(new CustomEvent('stop-public-music'));

    const timer = setTimeout(() => {
      setTransitionComplete(true);
    }, 2500);

    // Look for a private hero background image
    const loadPrivateHero = () => {
      const photoModules = import.meta.glob('/src/assets/private_photos/*hero*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });
      const files = Object.values(photoModules);
      if (files.length > 0) {
        setBgImage(files[0]);
      }
    };
    
    // Look for bubu companion gifs
    const loadBubu = () => {
      const bubuModules = import.meta.glob('/src/assets/private_photos/*bubu*.{gif,png,webp}', { eager: true, query: '?url', import: 'default' });
      const files = Object.keys(bubuModules).reduce((acc, key) => {
        const name = key.toLowerCase();
        if (name.includes('hang')) acc.hang = bubuModules[key];
        else if (name.includes('3')) acc.bubu3 = bubuModules[key];
        return acc;
      }, { hang: null, bubu3: null });
      setBubuImgs(files);
    };

    // Load audio source
    const loadAudioSrc = () => {
      const audioModules = import.meta.glob('/src/assets/audio/*.{mp3,wav,ogg,m4a,mpeg,mp4}', { eager: true, query: '?url', import: 'default' });
      const files = Object.values(audioModules).filter(f => f.toLowerCase().includes('private') || f.toLowerCase().includes('vellake'));
      if (files.length > 0) {
        setAudioSrc(files[0]);
      }
    };

    loadPrivateHero();
    loadBubu();
    loadAudioSrc();

    return () => clearTimeout(timer);
  }, []);

  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Handle play/pause state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Auto-play blocked:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioSrc]);

  // Handle video modal events
  useEffect(() => {
    const handleVideoPlaying = () => {
      if (audioRef.current && isPlaying) audioRef.current.pause();
    };
    const handleVideoStopped = () => {
      if (audioRef.current && isPlaying) audioRef.current.play().catch(e => console.log(e));
    };

    window.addEventListener('video-playing', handleVideoPlaying);
    window.addEventListener('video-stopped', handleVideoStopped);
    return () => {
      window.removeEventListener('video-playing', handleVideoPlaying);
      window.removeEventListener('video-stopped', handleVideoStopped);
    };
  }, [isPlaying]);

  // Generate magical floating fragments for the new world
  const fragments = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      className="fixed inset-0 z-[100] bg-[#0d070b] overflow-y-auto overflow-x-hidden"
    >
      {/* Autoplay Private Audio */}
      {audioSrc && <audio ref={audioRef} src={audioSrc} loop className="hidden" />}

      {/* Private Music Toggle Button */}
      {audioSrc && transitionComplete && (
        <div className="fixed bottom-6 right-6 z-[150]">
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-[#d88ca8] transition-colors shadow-lg"
          >
            {isPlaying ? (
              <div className="flex gap-1 items-end h-5">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["4px", "20px", "4px"] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 bg-current rounded-full"
                  />
                ))}
              </div>
            ) : (
              <VolumeX size={20} />
            )}
          </motion.button>
        </div>
      )}

      {/* Dynamic Private Background */}
      {bgImage && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1.2 }}
            transition={{ duration: 4, delay: 1 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>
      )}

      {/* Portal Explosion Animation */}
      <AnimatePresence>
        {!transitionComplete && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 1, 50], 
                opacity: [1, 1, 0] 
              }}
              transition={{ duration: 2.5, ease: [0.8, 0, 0.2, 1] }}
              className="w-32 h-32 rounded-full bg-white mix-blend-screen shadow-[0_0_100px_50px_#fff,0_0_200px_100px_#d88ca8]"
            />
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: [0, 2, 0], rotate: 180 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute text-white"
            >
              <Sparkles className="w-40 h-40 drop-shadow-[0_0_20px_#fff]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating magical environment fragments */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {fragments.map((frag) => (
          <motion.div
            key={frag.id}
            initial={{ opacity: 0, x: `${frag.x}vw`, y: `${frag.y}vh` }}
            animate={{ 
              opacity: [0, 0.8, 0],
              y: [`${frag.y}vh`, `${frag.y - 20}vh`],
              x: [`${frag.x}vw`, `${frag.x + (Math.random() * 10 - 5)}vw`]
            }}
            transition={{ 
              duration: frag.duration, 
              repeat: Infinity, 
              delay: frag.delay,
              ease: "linear"
            }}
            className="absolute rounded-full bg-white shadow-[0_0_15px_#d88ca8]"
            style={{ width: frag.size, height: frag.size }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={transitionComplete ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.95 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 min-h-screen pt-12"
      >
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 z-50 p-3 glass-dark rounded-full hover:bg-white/10 transition-colors group cursor-pointer"
        >
          <X className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
        </button>

        <PrivateAlbums />
      </motion.div>

      {/* Draggable Bubu Companions in Private World */}
      <AnimatePresence>
        {transitionComplete && bubuImgs.bubu3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-10 left-4 md:left-10 z-[120] drop-shadow-[0_0_20px_rgba(216,140,168,0.5)]"
          >
            <motion.div
              drag
              dragSnapToOrigin={true}
              dragElastic={0.6}
              whileDrag={{ scale: 1.2, cursor: "grabbing" }}
              className="cursor-grab w-24 md:w-32 h-auto"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -2, 2, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-full h-full"
              >
                <img 
                  src={bubuImgs.bubu3} 
                  alt="Secret Bubu 3" 
                  className="w-full h-full object-contain pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {transitionComplete && bubuImgs.hang && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-0 right-2 md:right-4 z-[120] drop-shadow-[0_0_20px_rgba(216,140,168,0.5)] origin-top scale-x-[-1]"
          >
            <motion.div
              drag
              dragSnapToOrigin={true}
              dragElastic={0.6}
              whileDrag={{ scale: 1.1, cursor: "grabbing" }}
              className="cursor-grab w-28 md:w-40 h-auto"
            >
              <motion.div
                animate={{
                  rotate: [-3, 3, -3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-full h-full origin-top"
              >
                <img 
                  src={bubuImgs.hang} 
                  alt="Hanging Bubu" 
                  className="w-full h-full object-contain pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SecretWorld;
