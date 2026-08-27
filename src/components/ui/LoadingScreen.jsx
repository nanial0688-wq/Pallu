import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "Preparing your Raksha Bandhan surprise...",
  "Polishing the rakhi...",
  "Collecting embarrassing memories... 😂",
  "Preparing your brother's emotional speech...",
  "Okay. Let's begin. ❤️"
];

export default function LoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < messages.length - 1) {
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 800); // Fast transition for the loading
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <motion.div 
      className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <div className="text-center px-4">
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xl md:text-2xl font-semibold text-amber-100"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
