import React, { useState } from 'react';
import {
  HelloKittyFace,
  CinnabunPet,
  PuddingPet,
  HelloKittyBow,
  StrawberryIcon,
  StrawberryMilkIcon,
  BirthdayCakeIcon,
  PartyHatSvg,
  PrincessCrownSvg,
  HeartGlassesSvg,
} from '../shared/KawaiiSvgIcons';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { soundManager } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Utensils, Gamepad, Shirt, Gift } from 'lucide-react';

export const VirtualPetSanctuary = ({ happinessScore, setHappinessScore, onOpenSecretLetter }) => {
  const [selectedPet, setSelectedPet] = useState('kitty'); // 'kitty' | 'cinnabun' | 'pudding'
  const [currentSpeech, setCurrentSpeech] = useState({
    kitty: "Happy Birthday, gorgeous! Click to pet me! 🎀",
    cinnabun: "Wiggle wiggle! Happy Birthday!! ☁️",
    pudding: "Yawn... Best birthday girl ever! 🍮",
  });
  const [petAccessories, setPetAccessories] = useState({
    kitty: 'none', // 'none' | 'hat' | 'crown' | 'glasses'
    cinnabun: 'none',
    pudding: 'none',
  });
  const [jumpingPet, setJumpingPet] = useState(null);
  const [activeAction, setActiveAction] = useState('pet'); // 'pet' | 'feed' | 'play' | 'dress'
  const [floatingHeartPet, setFloatingHeartPet] = useState(null);

  const addHappiness = (amount) => {
    setHappinessScore((prev) => {
      const next = Math.min(100, prev + amount);
      if (next >= 100 && prev < 100) {
        // Trigger 100% unlocked celebration!
        soundManager.playVictorySound();
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#FF6B8B', '#FFD1DC', '#89CFF0', '#FCD34D'],
        });
      }
      return next;
    });
  };

  // Petting a character
  const handlePetCharacter = (petKey) => {
    soundManager.playHeartSound();
    setJumpingPet(petKey);
    setFloatingHeartPet(petKey);
    addHappiness(5);

    const dialogues = BIRTHDAY_CONFIG.PETS[petKey.toUpperCase()]?.dialogues || [
      "I love you so much! 💖",
      "Happy Birthday!! 🎀",
    ];
    const randomMsg = dialogues[Math.floor(Math.random() * dialogues.length)];

    setCurrentSpeech((prev) => ({ ...prev, [petKey]: randomMsg }));

    setTimeout(() => {
      setJumpingPet(null);
    }, 600);

    setTimeout(() => {
      setFloatingHeartPet(null);
    }, 1000);
  };

  // Feed treat
  const handleFeedPet = (treatName) => {
    soundManager.playPopSound();
    setJumpingPet(selectedPet);
    addHappiness(10);

    setCurrentSpeech((prev) => ({
      ...prev,
      [selectedPet]: `*Nom nom nom* Mmm, this ${treatName} is so yummy! Thank you! 😋💖`,
    }));

    setTimeout(() => {
      setJumpingPet(null);
    }, 500);
  };

  // Play with pet
  const handlePlayWithPet = (toyName) => {
    soundManager.playHeartSound();
    setJumpingPet(selectedPet);
    addHappiness(10);

    setCurrentSpeech((prev) => ({
      ...prev,
      [selectedPet]: `Wheeee! Playing with the ${toyName} is so fun! You're the best! 🎈✨`,
    }));

    setTimeout(() => {
      setJumpingPet(null);
    }, 600);
  };

  // Toggle accessory
  const handleToggleAccessory = (acc) => {
    soundManager.playPopSound();
    setPetAccessories((prev) => ({
      ...prev,
      [selectedPet]: prev[selectedPet] === acc ? 'none' : acc,
    }));
    addHappiness(5);
  };

  return (
    <section id="sanctuary" className="relative py-16 px-4 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-pinkLight border border-pink-200 text-pastel-pinkDeep text-xs font-bold shadow-sm mb-3">
          <HelloKittyBow className="w-4 h-4" />
          <span>CHAPTER THREE</span>
          <HelloKittyBow className="w-4 h-4" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-berry tracking-tight">
          Kitty & Friends Sanctuary 🐾🌸
        </h2>
        <p className="mt-2 text-pastel-berryLight max-w-xl mx-auto text-sm sm:text-base">
          Pet them, feed them yummy treats, or dress them up in cute party accessories! Fill their Happiness Meter to 100% to unlock a secret birthday love letter!
        </p>

        {/* Big Happiness Meter */}
        <div className="mt-6 max-w-md mx-auto p-4 bg-white/90 rounded-3xl border-2 border-pink-200 shadow-kawaii">
          <div className="flex items-center justify-between text-xs font-black text-pastel-berry mb-2">
            <span className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>Sanctuary Happiness Meter</span>
            </span>
            <span className="text-pastel-pinkDeep font-extrabold text-sm tabular-nums">
              {happinessScore}%
            </span>
          </div>

          <div className="w-full h-4 bg-pink-100 rounded-full overflow-hidden p-0.5 border border-pink-200">
            <div
              className="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full transition-all duration-500 relative"
              style={{ width: `${happinessScore}%` }}
            >
              {happinessScore > 20 && (
                <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white animate-ping" />
              )}
            </div>
          </div>

          {/* Unlock notice or status */}
          <div className="mt-3 flex items-center justify-between">
            {happinessScore >= 100 ? (
              <button
                onClick={onOpenSecretLetter}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold text-xs shadow-kawaii animate-bounceCute"
              >
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>SECRET LOVE LETTER UNLOCKED! CLICK TO READ 💌</span>
              </button>
            ) : (
              <span className="text-[11px] text-pastel-berryLight font-medium mx-auto">
                Reach 100% happiness to reveal your secret birthday love letter! 💌
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Sanctuary Playground Room */}
      <div className="relative rounded-3xl bg-gradient-to-b from-sky-50/70 via-pink-50/50 to-pink-100/70 border-2 border-pink-200 p-6 sm:p-8 shadow-kawaii min-h-[380px] overflow-hidden flex flex-col justify-between">
        {/* Room decor: pastel clouds and bunting flags */}
        <div className="absolute top-2 left-6 text-xl opacity-50 pointer-events-none">☁️</div>
        <div className="absolute top-4 right-8 text-2xl opacity-50 pointer-events-none">☁️</div>
        <div className="absolute top-0 inset-x-0 h-4 flex justify-around opacity-60 pointer-events-none text-xs">
          <span>🎀</span>
          <span>✨</span>
          <span>🎀</span>
          <span>✨</span>
          <span>🎀</span>
          <span>✨</span>
          <span>🎀</span>
        </div>

        {/* 3 Interactive Pets in the Room */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10 my-auto items-end">
          {/* PET 1: KITTY */}
          <div
            onClick={() => {
              setSelectedPet('kitty');
              handlePetCharacter('kitty');
            }}
            className={`flex flex-col items-center cursor-pointer transition-all ${
              selectedPet === 'kitty' ? 'scale-105' : 'hover:scale-102 opacity-95'
            }`}
          >
            {/* Speech bubble */}
            <div className="relative mb-3 px-3 py-1.5 bg-white rounded-2xl border-2 border-pink-300 shadow-sm max-w-[200px] text-center text-xs font-bold text-pastel-berry">
              <span>{currentSpeech.kitty}</span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-pink-300 rotate-45" />
            </div>

            {/* Character Container with Accessory & Animations */}
            <div className="relative">
              {/* Accessory on Kitty */}
              {petAccessories.kitty === 'hat' && (
                <div className="absolute -top-7 left-3 z-20 animate-wiggle">
                  <PartyHatSvg className="w-8 h-8" />
                </div>
              )}
              {petAccessories.kitty === 'crown' && (
                <div className="absolute -top-6 left-5 z-20 animate-bounceCute">
                  <PrincessCrownSvg className="w-8 h-6" />
                </div>
              )}
              {petAccessories.kitty === 'glasses' && (
                <div className="absolute top-7 left-3 z-20">
                  <HeartGlassesSvg className="w-12 h-6" />
                </div>
              )}

              {/* Floating Heart reaction */}
              {floatingHeartPet === 'kitty' && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl animate-ping pointer-events-none z-30">
                  💖
                </div>
              )}

              {/* Kitty SVG */}
              <div className={`${jumpingPet === 'kitty' ? 'animate-bounceCute' : 'hover:scale-105'} transition-transform`}>
                <HelloKittyFace className="w-28 h-24 drop-shadow-md" />
              </div>
            </div>

            {/* Name pill */}
            <span className={`mt-2 px-3 py-0.5 rounded-full text-xs font-extrabold border ${
              selectedPet === 'kitty' ? 'bg-pink-500 text-white border-pink-600 shadow-sm' : 'bg-white text-pastel-berry border-pink-200'
            }`}>
              Kitty White 🎀
            </span>
          </div>

          {/* PET 2: CINNABUN */}
          <div
            onClick={() => {
              setSelectedPet('cinnabun');
              handlePetCharacter('cinnabun');
            }}
            className={`flex flex-col items-center cursor-pointer transition-all ${
              selectedPet === 'cinnabun' ? 'scale-105' : 'hover:scale-102 opacity-95'
            }`}
          >
            {/* Speech bubble */}
            <div className="relative mb-3 px-3 py-1.5 bg-white rounded-2xl border-2 border-blue-300 shadow-sm max-w-[200px] text-center text-xs font-bold text-pastel-berry">
              <span>{currentSpeech.cinnabun}</span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-blue-300 rotate-45" />
            </div>

            {/* Character Container */}
            <div className="relative">
              {petAccessories.cinnabun === 'hat' && (
                <div className="absolute -top-7 left-8 z-20 animate-wiggle">
                  <PartyHatSvg className="w-8 h-8" />
                </div>
              )}
              {petAccessories.cinnabun === 'crown' && (
                <div className="absolute -top-6 left-9 z-20 animate-bounceCute">
                  <PrincessCrownSvg className="w-8 h-6" />
                </div>
              )}
              {petAccessories.cinnabun === 'glasses' && (
                <div className="absolute top-9 left-7 z-20">
                  <HeartGlassesSvg className="w-12 h-6" />
                </div>
              )}

              {floatingHeartPet === 'cinnabun' && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl animate-ping pointer-events-none z-30">
                  💙
                </div>
              )}

              <div className={`${jumpingPet === 'cinnabun' ? 'animate-bounceCute' : 'hover:scale-105 animate-float'} transition-transform`}>
                <CinnabunPet className="w-32 h-26 drop-shadow-md" />
              </div>
            </div>

            <span className={`mt-2 px-3 py-0.5 rounded-full text-xs font-extrabold border ${
              selectedPet === 'cinnabun' ? 'bg-blue-400 text-white border-blue-500 shadow-sm' : 'bg-white text-pastel-berry border-blue-200'
            }`}>
              Cinnabun ☁️
            </span>
          </div>

          {/* PET 3: PUDDING */}
          <div
            onClick={() => {
              setSelectedPet('pudding');
              handlePetCharacter('pudding');
            }}
            className={`flex flex-col items-center cursor-pointer transition-all ${
              selectedPet === 'pudding' ? 'scale-105' : 'hover:scale-102 opacity-95'
            }`}
          >
            {/* Speech bubble */}
            <div className="relative mb-3 px-3 py-1.5 bg-white rounded-2xl border-2 border-amber-300 shadow-sm max-w-[200px] text-center text-xs font-bold text-pastel-berry">
              <span>{currentSpeech.pudding}</span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-amber-300 rotate-45" />
            </div>

            {/* Character Container */}
            <div className="relative">
              {petAccessories.pudding === 'hat' && (
                <div className="absolute -top-7 left-8 z-20 animate-wiggle">
                  <PartyHatSvg className="w-8 h-8" />
                </div>
              )}
              {petAccessories.pudding === 'crown' && (
                <div className="absolute -top-6 left-9 z-20 animate-bounceCute">
                  <PrincessCrownSvg className="w-8 h-6" />
                </div>
              )}
              {petAccessories.pudding === 'glasses' && (
                <div className="absolute top-10 left-7 z-20">
                  <HeartGlassesSvg className="w-12 h-6" />
                </div>
              )}

              {floatingHeartPet === 'pudding' && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-2xl animate-ping pointer-events-none z-30">
                  🍯
                </div>
              )}

              <div className={`${jumpingPet === 'pudding' ? 'animate-bounceCute' : 'hover:scale-105'} transition-transform`}>
                <PuddingPet className="w-32 h-26 drop-shadow-md" />
              </div>
            </div>

            <span className={`mt-2 px-3 py-0.5 rounded-full text-xs font-extrabold border ${
              selectedPet === 'pudding' ? 'bg-amber-400 text-white border-amber-500 shadow-sm' : 'bg-white text-pastel-berry border-amber-200'
            }`}>
              Pudding 🍮
            </span>
          </div>
        </div>

        {/* Interactive Action Command Bar */}
        <div className="mt-8 pt-4 border-t border-pink-200/80 bg-white/70 backdrop-blur-sm rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Action Tabs */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveAction('pet')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeAction === 'pet' ? 'bg-pink-500 text-white border-pink-600' : 'bg-white text-pastel-berry border-pink-200'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Pet</span>
            </button>
            <button
              onClick={() => setActiveAction('feed')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeAction === 'feed' ? 'bg-pink-500 text-white border-pink-600' : 'bg-white text-pastel-berry border-pink-200'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Feed</span>
            </button>
            <button
              onClick={() => setActiveAction('play')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeAction === 'play' ? 'bg-pink-500 text-white border-pink-600' : 'bg-white text-pastel-berry border-pink-200'
              }`}
            >
              <Gamepad className="w-3.5 h-3.5" />
              <span>Play</span>
            </button>
            <button
              onClick={() => setActiveAction('dress')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeAction === 'dress' ? 'bg-pink-500 text-white border-pink-600' : 'bg-white text-pastel-berry border-pink-200'
              }`}
            >
              <Shirt className="w-3.5 h-3.5" />
              <span>Dress Up</span>
            </button>
          </div>

          {/* Action Sub-options */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {activeAction === 'pet' && (
              <p className="text-xs text-pastel-berry font-bold">
                Click any friend above to give head pats! 🥰
              </p>
            )}

            {activeAction === 'feed' && (
              <>
                <button
                  onClick={() => handleFeedPet('Strawberry Shortcake')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-pink-100 hover:bg-pink-200 text-xs font-bold text-pink-700 border border-pink-300 shadow-sm"
                >
                  <StrawberryIcon className="w-4 h-4" />
                  <span>Cake (+10%)</span>
                </button>
                <button
                  onClick={() => handleFeedPet('Strawberry Milk')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-pink-100 hover:bg-pink-200 text-xs font-bold text-pink-700 border border-pink-300 shadow-sm"
                >
                  <StrawberryMilkIcon className="w-4 h-4" />
                  <span>Milk (+10%)</span>
                </button>
              </>
            )}

            {activeAction === 'play' && (
              <>
                <button
                  onClick={() => handlePlayWithPet('Pink Yarn Ball')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-100 hover:bg-rose-200 text-xs font-bold text-rose-700 border border-rose-300 shadow-sm"
                >
                  <span>🧶 Yarn (+10%)</span>
                </button>
                <button
                  onClick={() => handlePlayWithPet('Magic Star Wand')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 text-xs font-bold text-amber-700 border border-amber-300 shadow-sm"
                >
                  <span>🪄 Wand (+10%)</span>
                </button>
              </>
            )}

            {activeAction === 'dress' && (
              <>
                <button
                  onClick={() => handleToggleAccessory('hat')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border shadow-sm ${
                    petAccessories[selectedPet] === 'hat' ? 'bg-pink-500 text-white border-pink-600' : 'bg-white text-pastel-berry border-pink-200'
                  }`}
                >
                  <span>Party Hat 🥳</span>
                </button>
                <button
                  onClick={() => handleToggleAccessory('crown')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border shadow-sm ${
                    petAccessories[selectedPet] === 'crown' ? 'bg-pink-500 text-white border-pink-600' : 'bg-white text-pastel-berry border-pink-200'
                  }`}
                >
                  <span>Crown 👑</span>
                </button>
                <button
                  onClick={() => handleToggleAccessory('glasses')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border shadow-sm ${
                    petAccessories[selectedPet] === 'glasses' ? 'bg-pink-500 text-white border-pink-600' : 'bg-white text-pastel-berry border-pink-200'
                  }`}
                >
                  <span>Heart Shades 🕶️</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
