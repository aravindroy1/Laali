import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import RevealCard from './RevealCard';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const loadPhotos = async () => {
      const photoModules = import.meta.glob('/src/assets/public_photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url', import: 'default' });
      const loadedPhotos = Object.values(photoModules).map((url, i) => ({
        id: i,
        src: url,
        alt: `Memory ${i + 1}`
      }));
      // Filter out hero images from gallery
      const filteredPhotos = loadedPhotos.filter(p => !p.src.toLowerCase().includes('hero'));
      setPhotos(filteredPhotos);
    };
    
    loadPhotos();
  }, []);

  return (
    <section className="py-32 px-4 relative z-10 w-full min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="font-cursive text-6xl md:text-8xl text-white mb-6 text-glow">Floating Memories</h2>
          <p className="font-serif text-[#d88ca8] text-lg md:text-2xl tracking-widest uppercase">Catch a lantern to view the memory</p>
        </motion.div>

        {photos.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20 pb-32">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                // Stagger the bobbing animation so they all float differently
                animate={{ y: [0, -20, 0] }}
                transition={{ 
                  duration: 4 + (i % 3), 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.5 
                }}
                className="relative group cursor-pointer flex justify-center"
              >
                {/* The Lantern String */}
                <div className="absolute -top-20 left-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent to-[#ffaa55]/50" />
                
                {/* The Lantern Body */}
                <div className="w-full max-w-[300px] relative rounded-t-[3rem] rounded-b-2xl shadow-[0_0_50px_rgba(255,150,50,0.4)] border-2 border-[#ffaa55]/30 p-2 bg-[#1a0a05]/80 overflow-hidden group-hover:shadow-[0_0_80px_rgba(255,150,50,0.8)] transition-shadow duration-700">
                  <RevealCard>
                    <div onClick={() => setIndex(i)} className="w-full h-[400px] relative overflow-hidden rounded-t-[2.5rem] rounded-b-xl">
                      {/* Warm glowing filter over the photo */}
                      <div className="absolute inset-0 bg-[#ffaa55]/20 mix-blend-overlay z-10 pointer-events-none" />
                      
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                      />

                      {/* Lantern Base / Candle Glow */}
                      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#ff5500]/80 via-[#ffaa55]/20 to-transparent z-20 pointer-events-none" />
                      
                      {/* The Candle flame */}
                      <motion.div 
                        animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full filter blur-[15px] mix-blend-screen z-30"
                      />
                    </div>
                  </RevealCard>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <Lightbox
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={photos}
          styles={{ container: { backgroundColor: "rgba(13, 7, 11, 0.98)" } }}
        />
      </div>
    </section>
  );
};

export default Gallery;
