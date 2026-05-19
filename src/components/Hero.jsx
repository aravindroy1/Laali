import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [heroBg, setHeroBg] = useState(null);

  useEffect(() => {
    // Dynamically look for any file starting with 'hero' in public_photos
    const loadHero = async () => {
      const heroModules = import.meta.glob('/src/assets/public_photos/hero.{jpg,jpeg,png,webp}', { eager: true, as: 'url' });
      const files = Object.values(heroModules);
      if (files.length > 0) {
        setHeroBg(files[0]);
      } else {
        setHeroBg(null); 
      }
    };
    loadHero();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Transparent so the App.jsx parallax background shines through */}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-white/80 font-bold drop-shadow-md">
            Celebrating an amazing soul
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeOut" }}
        >
          <h1 className="font-cursive text-6xl md:text-8xl lg:text-9xl text-white mb-6 drop-shadow-[0_0_20px_rgba(216,140,168,0.8)] leading-tight">
            Happy Birthday <br />
            <span className="text-[#f3b6d1]">Laali</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="max-w-xl mx-auto"
        >
          <p className="font-serif text-lg md:text-2xl text-white/90 italic drop-shadow-md font-medium">
            "To a friend whose presence makes the world brighter. <br className="hidden md:block"/>
            Wishing you all the happiness you truly deserve."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 text-[#f3b6d1] drop-shadow-lg" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
