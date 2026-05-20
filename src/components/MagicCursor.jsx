import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';

const MagicCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    let particleId = 0;
    let lastTime = 0;

    const handleMouseMove = (e) => {
      // Update motion values directly without triggering React renders
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const now = Date.now();
      // Throttle spawn rate to 150ms to prevent heavy React state updates
      if (now - lastTime > 150) { 
        lastTime = now;
        const newParticle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 4,
          color: Math.random() > 0.5 ? '#d88ca8' : '#fff7fb',
          type: Math.random() > 0.8 ? 'butterfly' : 'sparkle'
        };

        setParticles((prev) => [...prev.slice(-10), newParticle]); // Reduced max particles
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* Main Cursor Glow */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 rounded-full mix-blend-screen bg-gradient-to-r from-[#d88ca8] to-[#b85b7e] opacity-60 -translate-x-1/2 -translate-y-1/2"
        style={{ x: mouseX, y: mouseY }}
        // Removed filter blur-md to massively improve GPU performance
      />
      
      {/* Center dot */}
      <motion.div
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff] -translate-x-1/2 -translate-y-1/2"
        style={{ x: mouseX, y: mouseY }}
      />

      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.8, x: p.x, y: p.y, scale: 0.5, rotate: 0 }}
            animate={{ 
              opacity: 0, 
              y: p.y - (Math.random() * 100 + 50), 
              x: p.x + (Math.random() * 100 - 50),
              scale: p.type === 'butterfly' ? 1.5 : 0,
              rotate: p.type === 'butterfly' ? Math.random() * 180 - 90 : 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.type === 'butterfly' ? 2 : 1, ease: 'easeOut' }}
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          >
            {p.type === 'butterfly' ? (
              <span className="text-4xl drop-shadow-[0_0_5px_rgba(216,140,168,0.8)]" style={{ color: p.color }}>
                🦋
              </span>
            ) : (
              <div 
                className="rounded-full shadow-[0_0_8px_currentColor]" 
                style={{ width: p.size, height: p.size, backgroundColor: p.color, color: p.color }} 
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MagicCursor;
