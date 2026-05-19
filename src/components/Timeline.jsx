import React from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  {
    year: 'Chapter 1',
    title: 'The Beginning',
    desc: 'A beautiful start to an unforgettable journey.',
    align: 'left'
  },
  {
    year: 'Chapter 2',
    title: 'Golden Moments',
    desc: 'Shared laughter, deep conversations, and memories that will last a lifetime.',
    align: 'right'
  },
  {
    year: 'Chapter 3',
    title: 'Adventures',
    desc: 'Exploring the world, trying new things, and making every second count.',
    align: 'left'
  },
  {
    year: 'Chapter 4',
    title: 'Today & Always',
    desc: 'Celebrating your light today, and wishing you endless joy for all your tomorrows.',
    align: 'right'
  }
];

const Timeline = () => {
  return (
    <section className="py-32 px-4 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-cursive text-5xl md:text-7xl text-[#d88ca8] mb-6 text-glow"
          >
            A Beautiful Journey
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-32 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto"
          />
        </div>

        {/* Central Line */}
        <div className="absolute left-[20px] md:left-1/2 top-48 bottom-0 w-[1px] bg-gradient-to-b from-[#b85b7e] via-[#d88ca8]/30 to-transparent transform md:-translate-x-1/2" />

        <div className="space-y-24">
          {timelineEvents.map((event, i) => (
            <div key={i} className={`relative flex flex-col md:flex-row items-start ${event.align === 'right' ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Glowing Dot */}
              <div className="absolute left-[11.5px] md:left-1/2 w-4 h-4 rounded-full bg-[#d88ca8] shadow-[0_0_20px_rgba(216,140,168,1)] transform -translate-x-1/2 mt-3 md:mt-0 z-10">
                <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50" />
              </div>

              {/* Content Box */}
              <motion.div
                initial={{ opacity: 0, x: event.align === 'left' ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`ml-12 md:ml-0 md:w-1/2 ${event.align === 'left' ? 'md:pr-20 text-left md:text-right' : 'md:pl-20 text-left'}`}
              >
                <div className="glass-dark p-8 md:p-10 rounded-3xl relative group hover:-translate-y-3 hover:shadow-[0_15px_40px_rgba(216,140,168,0.2)] transition-all duration-500 border border-white/5">
                  <motion.div 
                    animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i }}
                    className={`absolute -top-6 ${event.align === 'left' ? '-right-6' : '-left-6'} text-4xl text-[#d88ca8] opacity-50 drop-shadow-[0_0_10px_rgba(216,140,168,0.8)]`}
                  >
                    ✧
                  </motion.div>
                  <span className="font-sans text-xs tracking-[0.3em] text-[#d88ca8] uppercase font-bold mb-3 block">
                    {event.year}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 tracking-wide">
                    {event.title}
                  </h3>
                  <p className="font-serif text-white/60 italic leading-loose text-lg">
                    "{event.desc}"
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
