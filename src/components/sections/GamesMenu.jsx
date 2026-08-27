import React from 'react';
import { motion } from 'framer-motion';

export default function GamesMenu({ onNavigate }) {
  return (
    <motion.div 
      className="absolute inset-0 z-40 bg-slate-900 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <h2 className="text-4xl font-serif text-amber-400 mb-8 text-center drop-shadow-md">Surprise Box 🎁</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <GameCard 
          title="Quiz Time" 
          desc="How well do you know your brother?" 
          icon="🤔"
          onClick={() => onNavigate('quiz')}
          color="bg-blue-600"
        />
        <GameCard 
          title="Sibling Court" 
          desc="Time to face your crimes." 
          icon="⚖️"
          onClick={() => onNavigate('court')}
          color="bg-red-600"
        />
        <GameCard 
          title="Catch Rakhis" 
          desc="Catch falling rakhis. Earn nothing." 
          icon="🏃‍♀️"
          onClick={() => onNavigate('catch')}
          color="bg-green-600"
        />
      </div>
    </motion.div>
  );
}

function GameCard({ title, desc, icon, onClick, color }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${color} rounded-2xl p-6 cursor-pointer shadow-xl border border-white/10 relative overflow-hidden group`}
    >
      <div className="absolute top-0 right-0 p-4 text-6xl opacity-20 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="relative z-10">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80">{desc}</p>
      </div>
    </motion.div>
  );
}
