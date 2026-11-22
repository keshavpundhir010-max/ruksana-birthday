import React, { useEffect, useState } from 'react';
import { HelloKittyFace, HelloKittyBow } from '../shared/KawaiiSvgIcons';
import { soundManager } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';
import { Sparkles, PartyPopper, Heart, X } from 'lucide-react';

export const BirthdayPopupModal = ({ onOpen, friendName = "Ruksana Channnn" }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Play celebratory chime upon arrival
    const timer = setTimeout(() => {
      soundManager.playVictorySound();
      triggerConfettiBurst();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const triggerConfettiBurst = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FF6B8B', '#FFD1DC', '#89CFF0', '#FCD34D', '#FFF', '#C084FC'],
    });
  };

  const handleClose = () => {
    soundManager.playPopSound();
    triggerConfettiBurst();
    setIsOpen(false);
    if (onOpen) onOpen();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F7] to-[#FFEBF1] rounded-3xl max-w-lg w-full p-6 sm:p-8 border-4 border-pastel-pink shadow-kawaii-lg text-center animate-in zoom-in-90 duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating background decorative particles */}
        <div className="absolute top-2 left-4 text-xl animate-bounceCute opacity-80">🎀</div>
        <div className="absolute top-4 right-6 text-xl animate-pulse opacity-80">✨</div>
        <div className="absolute bottom-4 left-6 text-xl animate-float opacity-80">🎈</div>
        <div className="absolute bottom-6 right-6 text-xl animate-bounceCute opacity-80">🍰</div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-pink-100 text-pastel-berry border border-pink-200 transition-colors shadow-sm"
          title="Enter website"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mascot & Animated Bow Head */}
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full bg-white border-4 border-pink-300 shadow-kawaii flex items-center justify-center p-2 animate-bounceCute">
            <HelloKittyFace className="w-20 h-16 drop-shadow-md" />
          </div>
          <div className="absolute -bottom-2 right-1 animate-wiggle">
            <HelloKittyBow className="w-8 h-8" />
          </div>
        </div>

        {/* Celebratory Title Banner */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/90 border border-pink-300 text-pink-600 text-xs font-black mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
          <span>SPECIAL BIRTHDAY ALERT 🚨</span>
          <PartyPopper className="w-3.5 h-3.5 text-pink-500" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-pastel-berry tracking-tight leading-snug">
          Happy Birthday, <br />
          <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 bg-clip-text text-transparent underline decoration-pink-300 decoration-wavy decoration-2">
            Ruksana Channnn!!
          </span>{' '}
          🎀✨
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-pastel-berryLight max-w-sm mx-auto leading-relaxed font-medium">
          Welcome to your official Hello Kitty wonderland! Built specially to celebrate our unmatched bestie moments, peak meme expressions, and unlimited laughs!
        </p>

        {/* Cute Meme Tag Pill */}
        <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/90 border border-pink-200 shadow-sm text-xs font-bold text-pastel-berry">
          <span>🧢 100% Certified Meme Queen</span>
          <span>•</span>
          <span>👑 Best Friend Level: MAX</span>
        </div>

        {/* Action Button: Enter Celebration */}
        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={handleClose}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 text-white font-black text-sm sm:text-base shadow-kawaii hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <span>LET’S CELEBRATE, RUKSANA CHAN! 🥳</span>
            <Sparkles className="w-4 h-4 text-yellow-200 group-hover:rotate-12 transition-transform" />
          </button>
          <span className="text-[11px] text-pastel-berryLight font-semibold">
            (Turn your volume up for the chiptune birthday song! 🎶)
          </span>
        </div>
      </div>
    </div>
  );
};
