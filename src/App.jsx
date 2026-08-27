import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/ui/LoadingScreen';
import IntroScene from './components/sections/IntroScene';
import HomeWorld from './components/3d/HomeWorld';
// Sections
import QuizGame from './components/sections/QuizGame';
import SiblingCourt from './components/sections/SiblingCourt';
import CatchRakhis from './components/sections/CatchRakhis';
import MemoriesGallery from './components/sections/MemoriesGallery';
import RakhiTie from './components/sections/RakhiTie';
import Finale from './components/sections/Finale';
import GamesMenu from './components/sections/GamesMenu';

function App() {
  const [stage, setStage] = useState('loading'); // loading, intro, homeworld, games, quiz, court, catch, memories, rakhi-tie, finale

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setStage('intro');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (nextStage) => setStage(nextStage);

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-900 text-white font-sans">
      <AnimatePresence mode="wait">
        {stage === 'loading' && <LoadingScreen key="loading" />}
        {stage === 'intro' && <IntroScene key="intro" onEnter={() => navigateTo('homeworld')} />}
        {stage === 'homeworld' && <HomeWorld key="homeworld" onNavigate={navigateTo} />}
        {stage === 'games' && <GamesMenu key="games" onNavigate={navigateTo} />}
        {stage === 'quiz' && <QuizGame key="quiz" onBack={() => navigateTo('games')} />}
        {stage === 'court' && <SiblingCourt key="court" onBack={() => navigateTo('games')} />}
        {stage === 'catch' && <CatchRakhis key="catch" onBack={() => navigateTo('games')} />}
        {stage === 'memories' && <MemoriesGallery key="memories" onBack={() => navigateTo('homeworld')} />}
        {stage === 'rakhi-tie' && <RakhiTie key="rakhi-tie" onBack={() => navigateTo('homeworld')} />}
        {stage === 'finale' && <Finale key="finale" onBack={() => navigateTo('homeworld')} />}
      </AnimatePresence>
      
      {/* Global Navigation Button to return home when not in intro or loading or homeworld */}
      {stage !== 'loading' && stage !== 'intro' && stage !== 'homeworld' && (
        <button 
          onClick={() => navigateTo('homeworld')}
          className="absolute top-4 left-4 z-50 p-2 bg-slate-800/50 hover:bg-slate-700/80 rounded-full backdrop-blur transition-colors"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;
