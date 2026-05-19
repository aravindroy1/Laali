import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a0f16]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="relative w-24 h-24"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 10 C50 10 30 30 50 50 C50 50 70 70 50 90 C50 90 70 70 90 50 C90 50 70 30 50 10 Z"
              fill="#b85b7e"
              fillOpacity="0.6"
            />
            <path
              d="M10 50 C10 50 30 70 50 50 C50 50 70 30 90 50 C90 50 70 70 50 90 C50 90 30 70 10 50 Z"
              fill="#d88ca8"
              fillOpacity="0.8"
            />
          </svg>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-cursive text-3xl text-white text-glow"
        >
          For Laali...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;
