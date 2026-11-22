import React from 'react';

/**
 * Floating decorative pastel clouds, sparkling stars, and bows
 */
export const BackgroundDecor = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-70">
      {/* Soft gradient background orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pastel-pink/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-pastel-blue/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-12 left-1/4 w-88 h-88 bg-pastel-pinkLight/70 rounded-full blur-2xl" />

      {/* Floating Pastel Clouds */}
      <div className="absolute top-16 left-8 animate-float opacity-80 hidden md:block">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
          <ellipse cx="60" cy="40" rx="40" ry="20" fill="#FFFFFF" />
          <ellipse cx="40" cy="30" rx="22" ry="18" fill="#FFFFFF" />
          <ellipse cx="75" cy="28" rx="25" ry="20" fill="#FFFFFF" />
          <circle cx="50" cy="38" r="3" fill="#FFD1DC" />
          <circle cx="70" cy="38" r="3" fill="#FFD1DC" />
        </svg>
      </div>

      <div className="absolute top-48 right-12 animate-float-slow opacity-80 hidden lg:block" style={{ animationDelay: '2s' }}>
        <svg width="140" height="70" viewBox="0 0 140 70" fill="none">
          <ellipse cx="70" cy="45" rx="50" ry="22" fill="#FFFFFF" />
          <ellipse cx="48" cy="35" rx="26" ry="20" fill="#FFFFFF" />
          <ellipse cx="90" cy="32" rx="28" ry="22" fill="#FFFFFF" />
          <text x="65" y="44" fontSize="12" fill="#FF6B8B">🎀</text>
        </svg>
      </div>

      {/* Twinkling mini stars around viewport */}
      <span className="absolute top-28 left-[18%] text-amber-300 text-lg animate-sparkle">✦</span>
      <span className="absolute top-72 left-[8%] text-pink-300 text-sm animate-sparkle" style={{ animationDelay: '0.8s' }}>✧</span>
      <span className="absolute top-96 right-[15%] text-blue-300 text-base animate-sparkle" style={{ animationDelay: '1.2s' }}>✦</span>
      <span className="absolute bottom-40 left-[12%] text-pink-400 text-xs animate-sparkle" style={{ animationDelay: '2.1s' }}>✦</span>
      <span className="absolute bottom-72 right-[10%] text-amber-300 text-sm animate-sparkle" style={{ animationDelay: '1.7s' }}>✧</span>
      <span className="absolute top-1/2 left-[3%] text-pink-300 text-lg animate-bounceCute" style={{ animationDelay: '0.5s' }}>💖</span>
      <span className="absolute top-2/3 right-[4%] text-pink-300 text-lg animate-bounceCute" style={{ animationDelay: '1.8s' }}>🎀</span>
    </div>
  );
};
