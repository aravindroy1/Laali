import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const CakeEntrance = ({ onCut }) => {
  const [isCut, setIsCut] = useState(false); 
  const [cakeImg, setCakeImg] = useState(null);

  useEffect(() => {
    // Dynamically load cake image or GIF
    const loadAssets = async () => {
      const allAssets = import.meta.glob('/src/assets/*cake*.{png,jpg,jpeg,webp,gif}', { eager: true, as: 'url' });
      const files = Object.values(allAssets);
      if (files.length > 0) {
        setCakeImg(files[0]);
      }
    };
    loadAssets();
  }, []);

  const handleDragEnd = (event, info) => {
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) {
      triggerCut();
    }
  };

  const triggerCut = () => {
    if (isCut) return;
    setIsCut(true);
    
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 10,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors: ['#f3b6d1', '#d88ca8', '#ffffff', '#ffd700']
      });
      confetti({
        particleCount: 10,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
        colors: ['#f3b6d1', '#d88ca8', '#ffffff', '#ffd700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      onCut();
    }, 2500);
  };

  if (!cakeImg) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[200] bg-[#050204] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d88ca8] rounded-full mix-blend-screen filter blur-[200px] opacity-20 animate-pulse pointer-events-none" />

      <div className="relative w-full max-w-5xl h-[60vh] flex items-center justify-center mt-10">
        {/* The Cake */}
        <div className="relative z-30 w-72 h-96 md:w-96 md:h-[30rem] cursor-crosshair">
          {!isCut ? (
            <motion.div
              className="absolute inset-0 z-30"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3], x: [-50, 50, -50] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_30px_#fff] z-50 pointer-events-none"
              />
              <img 
                src={cakeImg} 
                alt="Birthday Cake"
                className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(216,140,168,0.5)] pointer-events-none"
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 flex justify-between pointer-events-none">
              <motion.div 
                className="w-1/2 h-full overflow-hidden"
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: -300, y: 150, rotate: -35, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <img src={cakeImg} className="w-[200%] max-w-none h-full object-contain" />
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full mix-blend-screen z-50"
                initial={{ scale: 1, x: '-50%', y: '-50%', opacity: 1 }}
                animate={{ scale: 300, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />

              <motion.div 
                className="w-1/2 h-full overflow-hidden relative"
                initial={{ x: 0, rotate: 0 }}
                animate={{ x: 300, y: 150, rotate: 35, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                <img src={cakeImg} className="absolute right-0 w-[200%] max-w-none h-full object-contain" />
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {!isCut && (
          <motion.div 
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-20 text-center pointer-events-none z-50"
          >
            <h1 className="font-cursive text-6xl md:text-8xl text-white drop-shadow-[0_0_30px_#d88ca8] mb-6 text-glow">
              Make a Wish
            </h1>
            <p className="font-sans text-white tracking-[0.3em] uppercase text-sm md:text-lg font-bold animate-pulse">
              Swipe across the cake to cut it
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default CakeEntrance;
