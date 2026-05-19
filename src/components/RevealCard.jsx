import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const RevealCard = ({ children, isPrivate = false }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const handleReveal = (e) => {
    if (isRevealed) return;
    setIsExploding(true);
    
    // Delay actual reveal to let explosion play
    setTimeout(() => {
      setIsRevealed(true);
      setIsExploding(false);
    }, 1200);
  };

  // Generate magical particles for explosion
  const generateParticles = () => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      angle: (i / 40) * Math.PI * 2,
      speed: Math.random() * 150 + 50,
      size: Math.random() * 20 + 10,
      isButterfly: Math.random() > 0.7
    }));
  };

  return (
    <div 
      className="relative w-full h-full cursor-pointer group rounded-2xl overflow-hidden"
      onClick={handleReveal}
    >
      <AnimatePresence>
        {!isRevealed && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#1a0f16]/80 backdrop-blur-xl border border-white/10"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
                filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="text-white w-10 h-10 mb-4 opacity-70" />
            </motion.div>
            <p className="font-sans text-[#d88ca8] text-xs tracking-[0.4em] uppercase font-bold text-glow">
              Tap to Reveal
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExploding && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none overflow-visible">
            {generateParticles().map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                animate={{ 
                  x: Math.cos(p.angle) * p.speed, 
                  y: Math.sin(p.angle) * p.speed, 
                  scale: [0, p.isButterfly ? 1.5 : 1, 0],
                  opacity: [1, 1, 0],
                  rotate: p.isButterfly ? Math.random() * 360 : 180
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute"
              >
                {p.isButterfly ? (
                  <span className="text-2xl drop-shadow-[0_0_10px_#fff]">🦋</span>
                ) : (
                  <div 
                    className="rounded-full bg-white shadow-[0_0_20px_#fff]" 
                    style={{ 
                      width: p.size, 
                      height: p.size,
                      background: 'radial-gradient(circle, #fff 0%, #d88ca8 100%)'
                    }} 
                  />
                )}
              </motion.div>
            ))}
            <motion.div 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 10, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute w-10 h-10 bg-white rounded-full mix-blend-screen filter blur-md"
            />
          </div>
        )}
      </AnimatePresence>
      
      <motion.div 
        initial={{ scale: 1.2, filter: 'blur(20px)', opacity: 0 }}
        animate={{ 
          scale: isRevealed ? 1 : 1.2, 
          filter: isRevealed ? 'blur(0px)' : 'blur(20px)', 
          opacity: isRevealed ? 1 : 0 
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealCard;
