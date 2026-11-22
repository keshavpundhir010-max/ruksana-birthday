import React, { useState, useEffect } from 'react';
import {
  HelloKittyFace,
  HelloKittyBow,
  StrawberryMilkIcon,
  CupcakeIcon,
  BirthdayCakeIcon,
  TeddyBearIcon,
  CinnabunPet,
  PuddingPet,
} from '../shared/KawaiiSvgIcons';
import { soundManager } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';
import { RotateCcw, Timer, Sparkles } from 'lucide-react';

const CARD_TYPES = [
  { id: 'kitty', name: 'Kitty Face', component: HelloKittyFace },
  { id: 'bow', name: 'Pink Bow', component: HelloKittyBow },
  { id: 'milk', name: 'Strawberry Milk', component: StrawberryMilkIcon },
  { id: 'cupcake', name: 'Sweet Cupcake', component: CupcakeIcon },
  { id: 'cake', name: 'Birthday Cake', component: BirthdayCakeIcon },
  { id: 'teddy', name: 'Teddy Bear', component: TeddyBearIcon },
  { id: 'cinnabun', name: 'Cinnabun Pup', component: CinnabunPet },
  { id: 'pudding', name: 'Pudding Pup', component: PuddingPet },
];

export const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // Initialize and shuffle deck
  const initializeGame = () => {
    const deck = [...CARD_TYPES, ...CARD_TYPES]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        uniqueId: `${item.id}-${index}`,
        typeId: item.id,
        name: item.name,
        component: item.component,
      }));

    setCards(deck);
    setFlippedIndices([]);
    setMatchedIds(new Set());
    setMoves(0);
    setTimerSeconds(0);
    setIsPlaying(true);
    setIsWon(false);
    soundManager.playPopSound();
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Timer tick
  useEffect(() => {
    let interval = null;
    if (isPlaying && !isWon) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isWon]);

  // Handle card click
  const handleCardClick = (index) => {
    // Prevent clicking already flipped or matched cards or when 2 cards are already open
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedIds.has(cards[index].typeId)
    ) {
      return;
    }

    soundManager.playPopSound();

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];

      if (firstCard.typeId === secondCard.typeId) {
        // Match found!
        setTimeout(() => {
          soundManager.playHeartSound();
          setMatchedIds((prev) => {
            const nextSet = new Set(prev).add(firstCard.typeId);
            if (nextSet.size === CARD_TYPES.length) {
              handleWin();
            }
            return nextSet;
          });
          setFlippedIndices([]);
        }, 350);
      } else {
        // No match - flip back
        setTimeout(() => {
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  const handleWin = () => {
    setIsWon(true);
    soundManager.playVictorySound();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF6B8B', '#FFD1DC', '#BFE3F7', '#FCD34D'],
    });
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border-2 border-pink-200 shadow-kawaii">
      {/* Game Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-pink-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🃏</span>
            <h3 className="text-lg font-bold text-pastel-berry">Kawaii Memory Match</h3>
          </div>
          <p className="text-xs text-pastel-berryLight mt-0.5">
            Flip cards to find matching pairs of cute Sanrio friends & sweet treats!
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-pink-50 rounded-2xl border border-pink-200 text-center">
            <span className="text-[10px] text-pastel-berryLight block font-bold">MOVES</span>
            <span className="text-base font-black text-pastel-pinkDeep tabular-nums">{moves}</span>
          </div>

          <div className="px-3 py-1.5 bg-blue-50 rounded-2xl border border-blue-200 text-center">
            <span className="text-[10px] text-blue-600 block font-bold flex items-center justify-center gap-0.5">
              <Timer className="w-3 h-3" /> TIME
            </span>
            <span className="text-base font-black text-blue-700 tabular-nums">{formatTime(timerSeconds)}</span>
          </div>

          <button
            onClick={initializeGame}
            title="Restart Game"
            className="p-2 rounded-2xl bg-white border border-pink-200 text-pastel-berry hover:bg-pink-50 shadow-sm transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4x4 Grid of Cards */}
      <div className="mt-6 max-w-lg mx-auto grid grid-cols-4 gap-3 relative">
        {cards.map((card, index) => {
          const isFlipped = flippedIndices.includes(index) || matchedIds.has(card.typeId);
          const isMatched = matchedIds.has(card.typeId);
          const CardIcon = card.component;

          return (
            <div
              key={card.uniqueId}
              onClick={() => handleCardClick(index)}
              className="aspect-square relative cursor-pointer perspective-1000 select-none"
            >
              <div
                className={`w-full h-full rounded-2xl transition-all duration-300 transform-style-3d border-2 ${
                  isFlipped
                    ? isMatched
                      ? 'bg-rose-50 border-rose-300 shadow-sm scale-95'
                      : 'bg-white border-pink-300 shadow-md rotate-y-180'
                    : 'bg-gradient-to-br from-pink-200 via-pink-100 to-rose-200 border-white hover:scale-105 shadow-kawaii'
                } flex items-center justify-center p-2`}
              >
                {isFlipped ? (
                  <div className="flex flex-col items-center justify-center animate-in zoom-in-75 duration-200">
                    <CardIcon className="w-10 h-10 drop-shadow-sm" />
                    {isMatched && (
                      <span className="absolute bottom-1 text-[9px] font-bold text-rose-500">
                        MATCH!
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-pastel-pinkDeep opacity-70">
                    <span className="text-xl">🎀</span>
                    <span className="text-[10px] font-black tracking-wider mt-0.5">HEART</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Win Modal Overlay */}
        {isWon && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 text-center z-20 animate-in zoom-in-90 duration-300">
            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center border-2 border-pink-300 mb-3 text-3xl animate-bounceCute">
              🎉
            </div>
            <h4 className="text-2xl font-black text-pastel-berry">You Did It, Cutie!</h4>
            <p className="text-xs text-pastel-berryLight mt-1">
              Solved all pairs in <span className="font-bold text-rose-500">{moves} moves</span> and{' '}
              <span className="font-bold text-blue-500">{formatTime(timerSeconds)}</span>!
            </p>
            <div className="mt-3 flex items-center gap-1.5 px-3 py-1 bg-pink-50 rounded-full border border-pink-200 text-xs text-pink-600 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Perfect Kawaii Memory! 💖</span>
            </div>
            <button
              onClick={initializeGame}
              className="mt-5 flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold text-sm shadow-kawaii hover:scale-105 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Another Round</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
