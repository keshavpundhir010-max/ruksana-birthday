import React, { useState } from 'react';
import { WhackABonk } from './WhackABonk';
import { MemoryMatch } from './MemoryMatch';
import { CatchTheTreats } from './CatchTheTreats';
import { HelloKittyBow } from '../shared/KawaiiSvgIcons';
import { soundManager } from '../../utils/audioSynth';
import { Gamepad2 } from 'lucide-react';

export const MiniGamesHub = () => {
  const [activeTab, setActiveTab] = useState('bonk'); // 'bonk' | 'match' | 'catch'

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    soundManager.playPopSound();
  };

  return (
    <section id="arcade" className="relative py-16 px-4 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-pinkLight border border-pink-200 text-pastel-pinkDeep text-xs font-bold shadow-sm mb-3">
          <HelloKittyBow className="w-4 h-4" />
          <span>CHAPTER TWO</span>
          <HelloKittyBow className="w-4 h-4" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-berry tracking-tight flex items-center justify-center gap-2">
          <span>The Kawaii Arcade</span>
          <Gamepad2 className="w-8 h-8 text-pastel-pinkDeep animate-bounceCute" />
        </h2>
        <p className="mt-2 text-pastel-berryLight max-w-xl mx-auto text-sm sm:text-base">
          3 custom-built mini-games made especially to celebrate you! Grab your toy hammer, test your memory, or catch some birthday cake!
        </p>
      </div>

      {/* Arcade Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => handleTabChange('bonk')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
            activeTab === 'bonk'
              ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border-pink-400 shadow-kawaii scale-105'
              : 'bg-white text-pastel-berry border-pink-200 hover:bg-pink-50 shadow-sm'
          }`}
        >
          <span>🔨</span>
          <span>Whack-a-Kuromi</span>
        </button>

        <button
          onClick={() => handleTabChange('match')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
            activeTab === 'match'
              ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border-pink-400 shadow-kawaii scale-105'
              : 'bg-white text-pastel-berry border-pink-200 hover:bg-pink-50 shadow-sm'
          }`}
        >
          <span>🃏</span>
          <span>Memory Match</span>
        </button>

        <button
          onClick={() => handleTabChange('catch')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
            activeTab === 'catch'
              ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border-pink-400 shadow-kawaii scale-105'
              : 'bg-white text-pastel-berry border-pink-200 hover:bg-pink-50 shadow-sm'
          }`}
        >
          <span>🧺</span>
          <span>Catch the Treats</span>
        </button>
      </div>

      {/* Active Mini-Game View */}
      <div className="transition-all duration-300">
        {activeTab === 'bonk' && <WhackABonk />}
        {activeTab === 'match' && <MemoryMatch />}
        {activeTab === 'catch' && <CatchTheTreats />}
      </div>
    </section>
  );
};
