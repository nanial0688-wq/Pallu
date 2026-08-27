import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RakhiTie({ onBack }) {
  const [tied, setTied] = useState(false);

  return (
    <motion.div 
      className="absolute inset-0 z-40 bg-slate-900 flex flex-col items-center justify-center p-6 overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-lg h-48 md:h-64 flex items-center justify-center mb-16">
        {/* Placeholder Wrist */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-20 md:h-28 bg-gradient-to-r from-amber-900/80 via-[#d2b48c] to-amber-900/80 rounded-full shadow-inner blur-[2px]" />
        
        {/* Rakhi Thread */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-[110%] h-1 md:h-2 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 shadow-[0_0_15px_red] rounded-full z-0"
          initial={{ scaleX: 0 }}
          animate={tied ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Rakhi Element */}
        <motion.div 
          className="absolute z-10 text-7xl md:text-9xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          initial={{ y: -150, scale: 1.2 }}
          animate={tied ? { y: 0, scale: 1, rotate: 360 } : { y: -120, scale: 1.2 }}
          transition={{ duration: 1.2, type: 'spring', bounce: 0.5 }}
        >
          🏵️
        </motion.div>
        
        {tied && (
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1.5, 0], 
                  x: (Math.random() - 0.5) * 300, 
                  y: (Math.random() - 0.5) * 300 
                }}
                transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
                className="absolute w-3 h-3 md:w-5 md:h-5 bg-amber-400 rounded-full shadow-[0_0_10px_orange]"
              />
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!tied ? (
          <motion.button 
            key="btn"
            onClick={() => setTied(true)}
            exit={{ opacity: 0, y: 20 }}
            className="px-10 py-5 bg-amber-600 hover:bg-amber-500 rounded-full font-bold text-2xl shadow-[0_0_20px_rgba(217,119,6,0.6)]"
          >
            Tie Rakhi
          </motion.button>
        ) : (
          <motion.div 
            key="msg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-amber-400 mb-4">Rakhi tied successfully ❤️</h2>
            <p className="text-2xl text-amber-100 mb-8">One promise renewed.</p>
            <button onClick={onBack} className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-full">
              Return Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
