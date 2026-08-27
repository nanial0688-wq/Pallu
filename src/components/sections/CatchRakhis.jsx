import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CatchRakhis({ onBack }) {
  const [rakhis, setRakhis] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameOver, setGameOver] = useState(false);
  const gameAreaRef = useRef(null);

  useEffect(() => {
    if (gameOver) return;

    const spawnInterval = setInterval(() => {
      const newRakhi = {
        id: Date.now(),
        left: Math.random() * 80 + 10, // 10% to 90%
      };
      setRakhis((prev) => [...prev, newRakhi]);
    }, 800);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          clearInterval(spawnInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(timer);
    };
  }, [gameOver]);

  const catchRakhi = (id) => {
    setScore((prev) => prev + 1);
    setRakhis((prev) => prev.filter(r => r.id !== id));
  };

  return (
    <motion.div 
      className="absolute inset-0 z-40 bg-slate-900 flex flex-col"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="p-4 flex justify-between items-center bg-slate-800">
        <h2 className="text-2xl font-bold text-amber-400">Score: {score}</h2>
        <h2 className="text-2xl font-bold text-white">Time: {timeLeft}s</h2>
      </div>
      
      <div className="flex-1 relative overflow-hidden" ref={gameAreaRef}>
        {!gameOver && rakhis.map((rakhi) => (
          <motion.div
            key={rakhi.id}
            initial={{ top: -50, opacity: 1 }}
            animate={{ top: '100%', opacity: 1 }}
            transition={{ duration: 3, ease: 'linear' }}
            onAnimationComplete={() => setRakhis((prev) => prev.filter(r => r.id !== rakhi.id))}
            className="absolute text-5xl cursor-pointer hover:scale-110 active:scale-95"
            style={{ left: `${rakhi.left}%` }}
            onClick={() => catchRakhi(rakhi.id)}
          >
            🏵️
          </motion.div>
        ))}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur">
            <h2 className="text-5xl font-bold text-amber-400 mb-4">Time's Up!</h2>
            <p className="text-2xl mb-2">You caught {score} rakhis.</p>
            <p className="text-xl text-slate-300 italic mb-8">
              "Congratulations! You have successfully earned... absolutely nothing. 😂"
            </p>
            <p className="text-lg text-amber-200 mb-8 font-medium">
              "Okay fine... you earned unlimited sibling privileges." ❤️
            </p>
            <button onClick={onBack} className="px-8 py-4 bg-amber-600 hover:bg-amber-500 rounded-full font-bold text-xl">
              Back to Surprises
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
