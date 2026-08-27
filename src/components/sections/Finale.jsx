import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rakhiConfig } from '../../config/rakhiConfig';

export default function Finale({ onBack }) {
  const [step, setStep] = useState(0); // 0: Promises, 1: Message Intro, 2: Message lines, 3: Surprise

  const promises = rakhiConfig.promises;
  const msg = rakhiConfig.finalMessage;

  return (
    <motion.div 
      className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center p-6 text-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <AnimatePresence mode="wait">
        {step === 0 && (
          <PromisesView onComplete={() => setStep(1)} promises={promises} key="promises" />
        )}
        
        {step === 1 && (
          <motion.div 
            key="msg-intro" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full cursor-pointer"
            onClick={() => setStep(2)}
          >
            <h2 className="text-4xl text-white mb-8">{msg.intro}</h2>
            <p className="text-white/50 text-sm animate-pulse">(Tap anywhere to continue)</p>
          </motion.div>
        )}

        {step === 2 && (
          <MessageLinesView lines={msg.lines} greeting={msg.greeting} outro={msg.outro} onComplete={() => setStep(3)} key="lines" />
        )}

        {step === 3 && (
          <SurpriseEnd onBack={onBack} key="surprise" />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PromisesView({ onComplete, promises }) {
  const [idx, setIdx] = useState(0);

  const handleNext = () => {
    if (idx < promises.length - 1) setIdx(idx + 1);
    else onComplete();
  };

  return (
    <motion.div 
      className="max-w-3xl flex flex-col items-center justify-center h-full cursor-pointer" 
      onClick={handleNext}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <h3 className="text-amber-500 mb-8 uppercase tracking-widest text-sm">Brother's Promises</h3>
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-3xl md:text-5xl font-serif text-amber-100"
        >
          {promises[idx]}
        </motion.p>
      </AnimatePresence>
      <p className="fixed bottom-10 text-white/30 text-sm animate-pulse">(Tap anywhere to continue)</p>
    </motion.div>
  );
}

function MessageLinesView({ lines, greeting, outro, onComplete }) {
  const [idx, setIdx] = useState(0);

  const handleNext = () => {
    if (idx < lines.length + 1) setIdx(idx + 1);
    else onComplete();
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full w-full cursor-pointer" 
      onClick={handleNext}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {idx < lines.length ? (
          <motion.p
            key={`line-${idx}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-3xl md:text-5xl text-white font-light"
          >
            {lines[idx]}
          </motion.p>
        ) : idx === lines.length ? (
          <motion.div key="greeting" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500 mb-6 drop-shadow-lg">
              {greeting}
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-2xl mx-auto">
              {outro}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

function SurpriseEnd({ onBack }) {
  const [showReal, setShowReal] = useState(false);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      {!showReal ? (
        <>
          <p className="text-2xl text-white mb-8">Wait... there's one more thing.</p>
          <button 
            onClick={() => setShowReal(true)}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-full font-bold text-xl shadow-[0_0_30px_rgba(147,51,234,0.6)] animate-bounce"
          >
            ONE LAST SURPRISE 🎁
          </button>
        </>
      ) : (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
          className="text-center"
        >
          <div className="text-9xl mb-6">💥</div>
          <h2 className="text-5xl font-black text-white mb-4">You're stuck with me forever. 😂❤️</h2>
          <button onClick={onBack} className="mt-12 px-6 py-2 border-2 border-white/20 hover:bg-white/10 rounded-full text-white/50">
            Return to World
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
