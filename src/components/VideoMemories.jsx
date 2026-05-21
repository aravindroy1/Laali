import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const VideoMemories = () => {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const loadVideos = () => {
      // Replace these with your Google Drive file IDs
      const googleDriveVideos = [
        { id: 'A', title: 'Memory A', fileId: '10hcU1PKmiXLgR1H-7pfzneBP50rtEg8g' },
        { id: 'B', title: 'Memory B', fileId: '1_yHpnP9qe8jfP38prhgflNE3ZYFQtEYl' },
        { id: 'C', title: 'Memory C', fileId: '1kvMT1wOoX96tYv2Ign_oiHRTBr_1-xx_' },
        { id: 'D', title: 'Memory D', fileId: '1k4wXc-5kllnI_tjaPNEME3EaiaC-n0Po' },
        { id: 'E', title: 'Memory E', fileId: '1hoF3yl7LebLn8z8jyy4tOKq3pBB41UeU' },
      ];

      const loadedVideos = googleDriveVideos.map((vid, i) => ({
        id: i,
        src: `https://drive.google.com/file/d/${vid.fileId}/preview`,
        title: vid.title,
      }));
      setVideos(loadedVideos);
    };
    loadVideos();
  }, []);

  useEffect(() => {
    if (activeVideo) {
      window.dispatchEvent(new CustomEvent('video-playing'));
    } else {
      window.dispatchEvent(new CustomEvent('video-stopped'));
    }
  }, [activeVideo]);

  if (videos.length === 0) {
    return null; // Hide section if no videos
  }

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-cursive text-5xl md:text-6xl text-[#d88ca8] mb-4">Moving Memories</h2>
          <p className="font-serif text-white/60 text-lg">Revisiting our favorite moments in motion.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid, i) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveVideo(vid)}
              className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-xl hover:shadow-[0_0_30px_rgba(216,140,168,0.3)] transition-shadow duration-500"
            >
              <div className="aspect-video bg-gradient-to-br from-[#2c1622] to-[#12070d] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,140,168,0.15),transparent_70%)]" />
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Play size={32} className="text-white ml-2" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <h3 className="font-serif text-xl text-white capitalize">{vid.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-md"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 left-6 text-white/50 hover:text-white z-[70] transition-colors"
              >
                <X size={32} />
              </button>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative"
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

export default VideoMemories;
