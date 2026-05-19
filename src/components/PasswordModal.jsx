import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const PasswordModal = ({ onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === 'laali') {
      onSuccess();
    } else {
      setError('Incorrect code');
      setPassword('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="glass-dark rounded-3xl p-8 max-w-sm w-full relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white"
        >
          <X size={24} />
        </button>
        <div className="text-center mb-6">
          <span className="text-2xl mb-2 block opacity-80">🗝️</span>
          <h3 className="font-serif text-2xl text-[#fff7fb] mb-1">Access Code</h3>
          <p className="font-sans text-xs text-[#d88ca8]">Enter code to unlock archived memories</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hint: Your name"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#d88ca8]/30 focus:outline-none focus:ring-2 focus:ring-[#d88ca8] text-[#fff7fb] mb-4 text-center placeholder-white/40"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#b85b7e] text-white font-semibold hover:bg-[#d88ca8] transition-colors"
          >
            Unlock
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PasswordModal;
