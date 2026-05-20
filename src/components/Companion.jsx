import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Companion = () => {
  const { scrollYProgress } = useScroll();
  const [isWaving, setIsWaving] = useState(false);
  const [bearImg, setBearImg] = useState(null);

  useEffect(() => {
    // Load bear image or GIF dynamically
    const loadBear = async () => {
      const allAssets = import.meta.glob('/src/assets/*bear*.{png,jpg,jpeg,webp,gif}', { eager: true, query: '?url', import: 'default' });
      const files = Object.values(allAssets);
      if (files.length > 0) {
        setBearImg(files[0]);
      }
    };
    loadBear();
  }, []);

  // Smooth out the scroll progress so the bear doesn't jerk
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Map scroll progress to vertical position on the screen
  const yPos = useTransform(smoothScroll, [0, 1], ['10vh', '90vh']);

  if (!bearImg) return null;

  return (
    <motion.div
      style={{ top: yPos }}
      className="fixed right-4 md:right-10 z-[80] drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hidden md:block"
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
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-full h-full"
        >
          <img 
            src={bearImg} 
            alt="Helper Bear" 
            className="w-full h-full object-contain pointer-events-none"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Companion;
