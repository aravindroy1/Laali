import React from 'react';
import { motion } from 'framer-motion';

const BirthdayNote = () => {
  const message1 = "On this beautiful day, I just wanted to remind you how incredibly special you are.";
  const message2 = "Your presence brings light to the darkest rooms, and your smile is the sweetest melody.";
  const message3 = "I hope this year brings you all the success, joy, and wonderful memories you deserve.";
  const message4 = "Keep shining brightly and being the amazing soul you are!";

  // Animation variants for the typewriter effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Speed of typing
        delayChildren: 0.5,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, textShadow: "0px 0px 0px rgba(216,140,168,0)" },
    visible: { 
      opacity: 1, 
      textShadow: "0px 0px 20px rgba(216,140,168,0.8)",
      transition: { duration: 0.1 }
    }
  };

  const renderAnimatedText = (text) => {
    return text.split('').map((char, index) => (
      <motion.span key={index} variants={letterVariants}>
        {char}
      </motion.span>
    ));
  };

  return (
    <section className="py-32 px-4 relative z-10 overflow-hidden min-h-[80vh] flex items-center">
      <div className="max-w-4xl mx-auto relative w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="glass-dark rounded-[3rem] p-10 md:p-20 relative shadow-[0_0_80px_rgba(216,140,168,0.15)] border border-[#d88ca8]/20"
        >
          <div className="text-center mb-12">
            <h3 className="font-serif text-[#d88ca8]/60 text-sm tracking-[0.5em] uppercase mb-4">A Special Note</h3>
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#d88ca8] to-transparent mx-auto"></div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8 text-center relative z-10"
          >
            <motion.p className="font-cursive text-5xl md:text-7xl text-white drop-shadow-md mb-12">
              {renderAnimatedText("Dearest Laali,")}
            </motion.p>
            
            <div className="space-y-6 font-serif text-xl md:text-3xl text-white/90 leading-relaxed italic font-light px-4 md:px-12">
              <p>{renderAnimatedText(message1)}</p>
              <p>{renderAnimatedText(message2)}</p>
              <p>{renderAnimatedText(message3)}</p>
              <p>{renderAnimatedText(message4)}</p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 10, duration: 2 }} // Wait for typing to finish
              className="pt-16"
            >
              <p className="font-cursive text-5xl md:text-6xl text-[#d88ca8] text-glow">
                Wishing you the happiest birthday.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BirthdayNote;
