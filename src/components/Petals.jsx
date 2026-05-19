import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Petals = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Generate petals
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 10,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute opacity-40"
          initial={{
            top: `-10%`,
            left: `${petal.x}%`,
            rotate: petal.rotation,
          }}
          animate={{
            top: `110%`,
            left: `${petal.x + (Math.random() * 20 - 10)}%`,
            rotate: petal.rotation + 360,
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            ease: "linear",
            delay: petal.delay,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C12 22 4 16 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 16 12 22 12 22Z"
              fill="#b85b7e"
              fillOpacity="0.8"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default Petals;
