import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rakhiConfig } from '../../config/rakhiConfig';

export default function QuizGame({ onBack }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOption = (index) => {
    setSelectedOption(index);
    if (index === rakhiConfig.quiz[currentQ].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQ < rakhiConfig.quiz.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <motion.div 
      className="absolute inset-0 z-40 bg-slate-900 flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="max-w-xl w-full bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div key="question" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
              <h2 className="text-amber-400 font-bold mb-2">Question {currentQ + 1} of {rakhiConfig.quiz.length}</h2>
              <h3 className="text-2xl font-semibold mb-6">{rakhiConfig.quiz[currentQ].question}</h3>
              <div className="space-y-3">
                {rakhiConfig.quiz[currentQ].options.map((opt, idx) => {
                  let btnColor = "bg-slate-700 hover:bg-slate-600";
                  if (selectedOption !== null) {
                    if (idx === rakhiConfig.quiz[currentQ].correct) btnColor = "bg-green-600";
                    else if (idx === selectedOption) btnColor = "bg-red-600";
                  }
                  return (
                    <button 
                      key={idx}
                      disabled={selectedOption !== null}
                      onClick={() => handleOption(idx)}
                      className={`w-full text-left p-4 rounded-xl transition-colors ${btnColor} font-medium`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <h2 className="text-4xl font-bold text-amber-400 mb-4">Quiz Complete!</h2>
              <p className="text-2xl mb-4">You scored {score} out of {rakhiConfig.quiz.length}</p>
              {score > 2 ? (
                <p className="text-xl text-green-400 mb-6">"Okay okay... you actually know me."</p>
              ) : (
                <p className="text-xl text-red-400 mb-6">"Wow. After all these years. I'm reconsidering this Rakhi." 😂</p>
              )}
              <p className="text-lg text-slate-300 italic mb-8">"But you're still my favorite sister." ❤️</p>
              
              <button onClick={onBack} className="px-6 py-3 bg-amber-600 hover:bg-amber-500 rounded-full font-bold">
                Return to Surprise Box
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
