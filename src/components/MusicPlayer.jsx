import React, { useState, useEffect, useRef } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

import mainAudioFile from '../assets/audio/MAIN.mpeg';
import introAudioFile from '../assets/audio/INTRO.mpeg';
import publicAudioFile from '../assets/audio/Public.mpeg';

const MusicPlayer = ({ appState, isUnlocked }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTrack, setCurrentTrack] = useState('main');
  
  const mainAudioRef = useRef(null);
  const introAudioRef = useRef(null);
  const publicAudioRef = useRef(null);

  // Initialize audio elements once
  useEffect(() => {
    mainAudioRef.current = new Audio(mainAudioFile);
    mainAudioRef.current.loop = true;
    mainAudioRef.current.volume = 0.5;
    
    introAudioRef.current = new Audio(introAudioFile);
    introAudioRef.current.loop = false;
    introAudioRef.current.volume = 0.5;
    
    publicAudioRef.current = new Audio(publicAudioFile);
    publicAudioRef.current.loop = true;
    publicAudioRef.current.volume = 0.4;

    const handleIntroEnd = () => {
      setCurrentTrack('public');
    };

    introAudioRef.current.addEventListener('ended', handleIntroEnd);

    return () => {
      if (introAudioRef.current) {
        introAudioRef.current.removeEventListener('ended', handleIntroEnd);
      }
      if (mainAudioRef.current) mainAudioRef.current.pause();
      if (introAudioRef.current) introAudioRef.current.pause();
      if (publicAudioRef.current) publicAudioRef.current.pause();
    };
  }, []);

  // Handle App State Transitions
  useEffect(() => {
    if (appState === 'countdown' || appState === 'loader') {
      setCurrentTrack('main');
    } else if (appState === 'website') {
      if (currentTrack === 'main') {
        setCurrentTrack('intro');
      }
    }
  }, [appState, currentTrack]);

  // Handle Playing logic whenever track or isPlaying changes
  useEffect(() => {
    const audios = {
      main: mainAudioRef.current,
      intro: introAudioRef.current,
      public: publicAudioRef.current
    };

    // Pause all first
    Object.values(audios).forEach(a => {
      if (a) a.pause();
    });

    // Play current if active and NOT in the private space
    if (isPlaying && !isUnlocked && audios[currentTrack]) {
      audios[currentTrack].play().catch(e => {
        console.log("Autoplay blocked, waiting for user interaction:", e);
        setIsPlaying(false);
      });
    }
  }, [isPlaying, currentTrack, isUnlocked]);

  // Global Event Listeners (e.g. from VideoModal or Secret World)
  useEffect(() => {
    const handleStopMusic = () => setIsPlaying(false);
    
    let wasPlayingBeforeVideo = false;
    const handleVideoPlaying = () => {
      if (isPlaying) {
        wasPlayingBeforeVideo = true;
        setIsPlaying(false);
      }
    };
    const handleVideoStopped = () => {
      if (wasPlayingBeforeVideo) {
        setIsPlaying(true);
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

  if (isUnlocked) return null;

  return (
    <div className="fixed top-1/2 left-4 -translate-y-1/2 z-[999]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
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
