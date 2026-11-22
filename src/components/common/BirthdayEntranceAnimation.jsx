import React, { useEffect, useState } from 'react';
import { HelloKittyFace, HelloKittyBow } from '../shared/KawaiiSvgIcons';
import { soundManager } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';
import { Sparkles, PartyPopper } from 'lucide-react';

export const BirthdayEntranceAnimation = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 🎶 Start the Chiptune Happy Birthday song for 30 seconds
    const startAudio = () => {
      soundManager.startHappyBirthdayMusic(30);
    };

    // Try starting immediately
    startAudio();

    // If browser policy blocked it prior to user gesture, start on first click/touch
    const handleFirstGesture = () => {
      startAudio();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

    // Multi-stage confetti cannon fireworks
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF6B8B', '#FFD1DC', '#89CFF0', '#FCD34D', '#FFF', '#C084FC'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors: ['#FF6B8B', '#FFD1DC', '#89CFF0', '#FCD34D', '#FFF', '#C084FC'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Auto-fade after 6 seconds if not dismissed sooner
    const autoDismissTimer = setTimeout(() => {
      handleDismiss();
    }, 6500);

    return () => {
      clearTimeout(autoDismissTimer);
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  const handleDismiss = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden transition-all duration-700 ${
        isFadingOut
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100 bg-gradient-to-b from-[#FFF0F5]/95 via-[#FFF9FA]/90 to-[#FFE4EC]/95 backdrop-blur-md'
      }`}
    >
      {/* Floating Pastel Balloons drifting in the background */}
      <div className="absolute top-10 left-[10%] text-4xl sm:text-5xl animate-float opacity-80 pointer-events-none">
        🎈
      </div>
      <div className="absolute top-16 right-[12%] text-5xl sm:text-6xl animate-float-slow opacity-85 pointer-events-none" style={{ animationDelay: '1s' }}>
        🎈
      </div>
      <div className="absolute bottom-20 left-[15%] text-4xl sm:text-5xl animate-bounceCute opacity-80 pointer-events-none">
        🎀
      </div>
      <div className="absolute bottom-24 right-[18%] text-4xl sm:text-5xl animate-sparkle opacity-85 pointer-events-none">
        ✨
      </div>
      <div className="absolute top-1/3 left-[5%] text-3xl sm:text-4xl animate-bounceCute opacity-70 pointer-events-none" style={{ animationDelay: '1.5s' }}>
        🍰
      </div>
      <div className="absolute top-1/2 right-[6%] text-3xl sm:text-4xl animate-wiggle opacity-75 pointer-events-none">
        🍄
      </div>

      {/* Centerpiece: Floating Hello Kitty Mascot waving with balloons */}
      <div className="relative mb-6 transform transition-transform duration-500 hover:scale-110">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/90 border-4 border-pink-300 shadow-kawaii-lg flex items-center justify-center p-3 animate-bounceCute">
          <HelloKittyFace className="w-24 h-20 sm:w-28 sm:h-24 drop-shadow-md" />
        </div>
        <div className="absolute -top-3 -right-2 animate-wiggle">
          <HelloKittyBow className="w-12 h-12" />
        </div>
        <div className="absolute -bottom-2 -left-2 text-3xl animate-bounce">
          🎉
        </div>
      </div>

      {/* Cascading Animated Typography: NO BOXES, PURE OPEN KAWAII ANIMATION */}
      <div className="text-center px-4 max-w-3xl">
        {/* Sub-badge line with sparkles */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black tracking-widest text-pink-500 uppercase animate-pulse mb-3 drop-shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>✦ THE OFFICIAL BIRTHDAY CELEBRATION ✦</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>

        {/* Grand Headline: HAPPY BIRTHDAY */}
        <h1 className="text-4xl sm:text-7xl font-black text-[#4A2535] tracking-tight leading-none drop-shadow-sm animate-in zoom-in-75 duration-500">
          HAPPY BIRTHDAY
        </h1>

        {/* Star Name: RUKSANA CHANNNN! */}
        <div className="mt-2 text-4xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-pink-500 via-rose-400 via-purple-500 to-pink-600 bg-clip-text text-transparent underline decoration-pink-300 decoration-wavy decoration-4 sm:decoration-8 drop-shadow-md animate-pulse">
            RUKSANA CHANNNN!
          </span>{' '}
          <span className="inline-block animate-wiggle text-4xl sm:text-7xl">🎀</span>
        </div>

        {/* Bestie Tagline */}
        <p className="mt-4 text-sm sm:text-lg font-bold text-pastel-berryLight max-w-xl mx-auto leading-relaxed animate-in fade-in duration-700">
          To our unmatched, chaotic, hilarious, and sweetest bestie! 💖✨
        </p>
      </div>

      {/* Floating Pill / Click-to-Enter Hint */}
      <div className="mt-10 animate-bounce">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/95 text-pastel-pinkDeep font-black text-xs sm:text-sm border-2 border-pink-300 shadow-kawaii hover:scale-105 transition-transform">
          <PartyPopper className="w-4 h-4 text-pink-500" />
          <span>Click Anywhere to Enter Party 🎈 (Playing 🎶 for 30s)</span>
        </div>
      </div>
    </div>
  );
};
