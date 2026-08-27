import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rakhiConfig } from '../../config/rakhiConfig';

export default function SiblingCourt({ onBack }) {
  const [chargeIdx, setChargeIdx] = useState(0);
  const [verdictShow, setVerdictShow] = useState(false);

  const handleNext = () => {
    if (chargeIdx < rakhiConfig.courtCharges.length - 1) {
      setChargeIdx(chargeIdx + 1);
    } else {
      setVerdictShow(true);
    }
  };

  return (
    <motion.div 
      className="absolute inset-0 z-40 bg-slate-900 flex flex-col items-center justify-center p-4 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="max-w-2xl w-full bg-slate-800/90 backdrop-blur border-4 border-amber-900 p-8 rounded-sm shadow-2xl text-center">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-amber-500 mb-2 uppercase tracking-wider">
          The People vs. {rakhiConfig.sisterName}
        </h1>
        <div className="h-1 w-full bg-amber-900 mb-8" />
        
        <AnimatePresence mode="wait">
          {!verdictShow ? (
            <motion.div key="trial" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <h2 className="text-xl text-slate-300 mb-4 uppercase tracking-widest">Current Charge:</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-12">
                "{rakhiConfig.courtCharges[chargeIdx]}"
              </h3>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={handleNext} className="px-6 py-3 bg-red-700 hover:bg-red-600 font-bold rounded shadow-lg">
                  GUILTY 😈
                </button>
                <button onClick={handleNext} className="px-6 py-3 bg-blue-700 hover:bg-blue-600 font-bold rounded shadow-lg">
                  INNOCENT 😇
                </button>
                <button onClick={handleNext} className="px-6 py-3 bg-yellow-700 hover:bg-yellow-600 font-bold rounded shadow-lg">
                  OBJECTION! ⚖️
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="verdict" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-8">
              <h1 className="text-6xl md:text-8xl font-black text-red-600 mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] border-y-4 border-red-600 py-4 inline-block">
                GUILTY.
              </h1>
              <p className="text-2xl text-amber-100 mb-8">
                Sentence: You must remain my sister forever. ❤️
              </p>
              <button onClick={onBack} className="px-6 py-3 bg-amber-700 hover:bg-amber-600 font-bold rounded">
                Court Dismissed
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
