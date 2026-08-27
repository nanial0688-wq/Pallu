import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroScene({ onEnter }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2000);
      return () => clearTimeout(timer);
    } else if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <motion.div 
      className="absolute inset-0 z-40 flex items-center justify-center bg-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, transition: { duration: 1.5 } }}
    >
      {/* Decorative particles (CSS based for now) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-amber-400 opacity-20 animate-pulse"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: (Math.random() * 3 + 2) + 's',
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>

      <div className="text-center px-6 relative z-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.h1
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-4xl md:text-6xl font-bold text-amber-400 mb-6 font-serif"
            >
              Hey Sis... ❤️
            </motion.h1>
          )}
          {step === 1 && (
            <motion.h1
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-3xl md:text-5xl font-medium text-amber-200 mb-6"
            >
              I made something for you.
            </motion.h1>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <p className="text-2xl md:text-3xl text-amber-100 mb-12">
                But you have to explore it yourself.
              </p>
              <button 
                onClick={onEnter}
                className="group relative px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold text-xl transition-all shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:shadow-[0_0_30px_rgba(217,119,6,0.6)] hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">ENTER YOUR SURPRISE ✨</span>
                <div className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity blur-md -z-10" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
