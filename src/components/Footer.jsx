import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Footer = ({ onSecretTrigger }) => {
  const [clicks, setClicks] = useState(0);

  const handleHeartClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks >= 3) {
      onSecretTrigger();
      setClicks(0); // reset
    }
  };

  return (
    <footer className="relative z-10 pt-32 pb-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center justify-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="mb-8"
        >
          <h2 className="font-cursive text-6xl md:text-8xl text-white text-glow mb-4">
            A Special Day
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-3 text-[#d88ca8] font-serif tracking-widest uppercase text-sm"
        >
          <span>Crafted</span>
          <motion.button
            onClick={handleHeartClick}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="focus:outline-none cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#b85b7e]" />
          </motion.button>
          <span>for Laali</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 1 }}
          className="mt-16 w-full h-[1px] bg-gradient-to-r from-transparent via-[#b85b7e] to-transparent opacity-30"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-8 font-serif text-xs text-white/40"
        >
          Wishing you the happiest of birthdays.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
