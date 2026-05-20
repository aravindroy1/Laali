import React, { useState, useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Dynamically load public audio file
    const loadAudio = () => {
      const audioModules = import.meta.glob('/src/assets/audio/*.{mp3,wav,ogg,m4a,mpeg,mp4}', { eager: true, query: '?url', import: 'default' });
      const files = Object.values(audioModules).filter(f => !f.toLowerCase().includes('private') && !f.toLowerCase().includes('vellake'));
      if (files.length > 0) {
        setAudioSrc(files[0]);
      }
    };
    loadAudio();
  }, []);

  useEffect(() => {
    if (audioSrc) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioSrc]);

  useEffect(() => {
    const handleStopMusic = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    
    let wasPlayingBeforeVideo = false;
    const handleVideoPlaying = () => {
      if (audioRef.current && isPlaying) {
        wasPlayingBeforeVideo = true;
        audioRef.current.pause();
      }
    };
    const handleVideoStopped = () => {
      if (audioRef.current && wasPlayingBeforeVideo) {
        audioRef.current.play().catch(e => console.log(e));
        wasPlayingBeforeVideo = false;
      }
    };

    window.addEventListener('stop-public-music', handleStopMusic);
    window.addEventListener('video-playing', handleVideoPlaying);
    window.addEventListener('video-stopped', handleVideoStopped);
    return () => {
      window.removeEventListener('stop-public-music', handleStopMusic);
      window.removeEventListener('video-playing', handleVideoPlaying);
      window.removeEventListener('video-stopped', handleVideoStopped);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  if (!audioSrc) return null; // Don't show player if no audio file is provided

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="glass w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-[#d88ca8] transition-colors shadow-lg"
      >
        {isPlaying ? (
          <div className="flex gap-1 items-end h-5">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ height: ["4px", "20px", "4px"] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1 bg-current rounded-full"
              />
            ))}
          </div>
        ) : (
          <VolumeX size={20} />
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer;
