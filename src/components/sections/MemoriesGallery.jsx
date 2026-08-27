import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rakhiConfig } from '../../config/rakhiConfig';

export default function MemoriesGallery({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = rakhiConfig.memories.length + 1;
  const next = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <motion.div 
      className="absolute inset-0 z-40 bg-slate-900 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <h2 className="absolute top-8 text-4xl font-serif text-amber-400">Our Memories</h2>
      
      <div className="relative max-w-3xl w-full h-3/4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentIndex < rakhiConfig.memories.length ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -100, rotate: -5 }}
              className="bg-white p-4 pb-16 rounded shadow-2xl relative"
            >
              <img 
                src={rakhiConfig.memories[currentIndex].image} 
                alt="Memory" 
                className="w-[75vw] max-w-[300px] md:max-w-[500px] aspect-square md:aspect-[5/4] object-cover border-2 border-slate-200 bg-slate-100"
              />
              <p className="absolute bottom-4 left-0 w-full text-center text-slate-800 font-handwriting text-xl font-bold px-4">
                {rakhiConfig.memories[currentIndex].caption}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex flex-col items-center text-center p-8 border-2 border-dashed border-amber-500/50 rounded-2xl bg-amber-900/20"
            >
              <div className="text-6xl mb-6 animate-pulse">📸</div>
              <h3 className="text-3xl font-serif text-amber-300 mb-4">Waiting for more memories...</h3>
              <p className="text-amber-100/70 max-w-md">
                We'll add more photos here as we continue to annoy each other for years to come.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={prev} className="absolute left-0 md:left-10 text-4xl text-white/50 hover:text-white p-4 z-10">
          ◀
        </button>
        <button onClick={next} className="absolute right-0 md:right-10 text-4xl text-white/50 hover:text-white p-4 z-10">
          ▶
        </button>
      </div>
      
      <button onClick={onBack} className="absolute bottom-8 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full">
        Return Home
      </button>
    </motion.div>
  );
}
