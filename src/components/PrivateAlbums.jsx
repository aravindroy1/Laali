import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Unlock, Play, X } from 'lucide-react';
import RevealCard from './RevealCard';

const PrivateAlbums = () => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(-1);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    // Load private photos
    const loadPhotos = async () => {
      const photoModules = import.meta.glob('/src/assets/private_photos/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });
      const loadedPhotos = Object.values(photoModules).map((url, i) => ({
        id: i,
        src: url,
        alt: `Private Memory ${i + 1}`
      }));
      // Filter out private hero image so it doesn't show in the masonry grid
      const filteredPhotos = loadedPhotos.filter(p => !p.src.toLowerCase().includes('hero'));
      setPhotos(filteredPhotos);
    };

    // Load private videos from Google Drive
    const loadVideos = async () => {
      // Replace these with your Google Drive file IDs for private videos
      const googleDriveVideos = [
        { id: 'F', title: 'Private Memory F', fileId: '1gAYaeqFL2P0RsqM9Vj6oar7mOrszEGvI' },
        { id: 'G', title: 'Private Memory G', fileId: '1vASDsJbSlvDPwBDg4aacNHxSdAVJDnOw' },
      ];

      const loadedVideos = googleDriveVideos.map((vid, i) => ({
        id: i,
        src: `https://drive.google.com/file/d/${vid.fileId}/preview`,
        title: vid.title,
      }));
      setVideos(loadedVideos);
    };
    
    loadPhotos();
    loadVideos();
  }, []);

  useEffect(() => {
    if (activeVideo) {
      window.dispatchEvent(new CustomEvent('video-playing'));
    } else {
      window.dispatchEvent(new CustomEvent('video-stopped'));
    }
  }, [activeVideo]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <section className="pb-24 px-4 relative z-10 w-full">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 pt-16"
        >
          <div className="flex justify-center mb-6">
            <Unlock className="text-[#d88ca8] w-10 h-10 opacity-80 drop-shadow-[0_0_15px_rgba(216,140,168,0.8)]" />
          </div>
          <h2 className="font-cursive text-6xl md:text-8xl text-white mb-8 text-glow tracking-wide">My Universe</h2>
          <div className="max-w-3xl mx-auto space-y-8 text-white/90 font-serif text-xl md:text-2xl leading-relaxed italic mb-16 px-4">
            <p className="drop-shadow-md">
              I made this hidden dimension just for us. Away from the world, away from everyone else. 
              Here is where I keep the moments that belong entirely to my heart.
            </p>
            <p className="font-serif text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md">
              Thank you for being such an amazing person. Wishing you all the happiness and joy in the world today and always.
            </p>
          </div>
        </motion.div>

        {photos.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center justify-center mb-12 gap-4">
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#d88ca8]/50" />
              <h3 className="font-serif text-2xl md:text-4xl text-[#d88ca8] tracking-widest uppercase">Secret Captures</h3>
              <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#d88ca8]/50" />
            </div>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {photos.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ 
                    y: { duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
                    opacity: { duration: 1, delay: (i % 3) * 0.2 }
                  }}
                  className="mb-8 relative rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-[#d88ca8]/20 hover:shadow-[0_0_40px_rgba(216,140,168,0.6)] hover:border-[#d88ca8]/60 transition-all duration-500"
                >
                  <RevealCard isPrivate={true}>
                    <div onClick={() => setIndex(i)} className="w-full h-full relative group cursor-pointer overflow-hidden rounded-2xl">
                      <div className="absolute inset-0 bg-[#d88ca8]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                      />
                    </div>
                  </RevealCard>
                </motion.div>
              ))}
            </Masonry>
          </div>
        )}

        {videos.length > 0 && (
          <div>
            <div className="flex items-center justify-center mb-12 gap-4">
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#d88ca8]/50" />
              <h3 className="font-serif text-2xl md:text-4xl text-[#d88ca8] tracking-widest uppercase">Moving Magic</h3>
              <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#d88ca8]/50" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((vid, i) => (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setActiveVideo(vid)}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/20"
                >
                  <div className="aspect-video bg-black/80">
                    <iframe
                      src={vid.src}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                      allow="autoplay"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center transform group-hover:scale-110 transition-transform border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      <Play size={40} className="text-white ml-2 drop-shadow-md" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/100 via-black/80 to-transparent">
                    <h3 className="font-serif text-2xl text-white capitalize drop-shadow-lg">{vid.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <Lightbox
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={photos}
          styles={{ container: { backgroundColor: "rgba(13, 7, 11, 0.98)" } }}
        />

        {/* Video Modal */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-12 bg-black/98 backdrop-blur-xl"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-8 left-8 text-white/50 hover:text-white z-[120] p-4 glass-dark rounded-full transition-all hover:scale-110 cursor-pointer"
              >
                <X size={32} />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] relative border border-white/10"
              >
                <iframe
                  src={activeVideo.src}
                  className="w-full h-full object-contain"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PrivateAlbums;
