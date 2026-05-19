import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ targetDate, onBypass }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    // Load countdown poster image
    const photoModules = import.meta.glob('/src/assets/public_photos/*countdown*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' });
    const files = Object.values(photoModules);
    if (files.length > 0) {
      setBgImage(files[0]);
    }

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      } else {
        // If countdown reaches zero automatically, bypass
        if (difference <= 0) {
          onBypass();
        }
      }
      setTimeLeft(newTimeLeft);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate, onBypass]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="w-full min-h-[150vh] relative bg-[#0d070b]">
      {/* Background Image / Poster (Scrolls naturally) */}
      {bgImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-0 left-0 w-full h-[150vh] z-0"
        >
          {/* Gradients - Top is transparent so face is visible, bottom is dark for text */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d070b] z-10" />
          <img src={bgImage} alt="Countdown Poster" className="w-full h-full object-cover object-top" />

          {/* Procedural Fog Effect (Attached to bottom of the 150vh image) */}
          <div className="absolute bottom-0 left-0 w-full h-[60vh] z-10 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ x: ["-5%", "5%", "-5%"], y: [0, -20, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[100%] bg-white/10 filter blur-[80px] mix-blend-screen rounded-[100%]"
            />
            <motion.div 
              animate={{ x: ["5%", "-5%", "5%"], y: [0, -40, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[-20%] left-[-20%] w-[140%] h-[120%] bg-[#d88ca8]/20 filter blur-[120px] mix-blend-screen rounded-[100%]"
            />
          </div>
        </motion.div>
      )}

      {/* CONSTANT Main Content (Fixed to screen) */}
      <div className="fixed inset-0 z-20 flex flex-col items-center justify-center w-full px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center mb-16"
        >
          <p className="font-serif text-[#d88ca8] text-xl md:text-2xl tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">Coming Soon</p>
          <h1 className="font-cursive text-7xl md:text-9xl text-white drop-shadow-[0_0_30px_rgba(216,140,168,0.8)] mb-6">Happy Birthday</h1>
          <p className="font-serif text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            A universe of memories is waiting for you. <br/> The magic unlocks on May 22nd.
          </p>
        </motion.div>

        {/* Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-3xl pointer-events-auto">
          {units.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
              className="glass-dark rounded-3xl p-6 flex flex-col items-center justify-center border border-[#d88ca8]/20 shadow-[0_0_30px_rgba(216,140,168,0.1)] backdrop-blur-md bg-black/40"
            >
              <span className="font-serif text-5xl md:text-6xl font-semibold text-white mb-2 text-glow drop-shadow-md">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-[#d88ca8] drop-shadow-md">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hidden Bypass Button (Fixed to screen) */}
      <div 
        onClick={onBypass}
        className="fixed bottom-4 right-4 w-12 h-12 flex items-center justify-center cursor-pointer z-50 opacity-20 hover:opacity-100 transition-opacity"
        title="Enter anyway"
      >
        <span className="text-white text-xs drop-shadow-lg">✦</span>
      </div>
    </div>
  );
};

export default Countdown;
