import React, { useState, useEffect, useRef } from 'react';
import {
  KawaiiBasket,
  StrawberryIcon,
  BirthdayCakeIcon,
  HelloKittyBow,
  AlarmClockIcon,
} from '../shared/KawaiiSvgIcons';
import { soundManager } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Heart, Trophy, Sparkles } from 'lucide-react';

export const CatchTheTreats = () => {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [basketX, setBasketX] = useState(50); // percentage 0% to 100%
  const [items, setItems] = useState([]); // [{ id, type, x, y, speed }]

  const arenaRef = useRef(null);
  const animationFrameRef = useRef(null);
  const spawnTimerRef = useRef(null);
  const basketXRef = useRef(50);
  basketXRef.current = basketX;

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setItems([]);
    setBasketX(50);
    soundManager.playPopSound();
  };

  // Keyboard and mouse basket controls
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') {
        setBasketX((prev) => Math.max(10, prev - 8));
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        setBasketX((prev) => Math.min(90, prev + 8));
      }
    };

    const handleMouseMove = (e) => {
      if (!arenaRef.current) return;
      const rect = arenaRef.current.getBoundingClientRect();
      const relativeX = ((e.clientX - rect.left) / rect.width) * 100;
      setBasketX(Math.max(8, Math.min(92, relativeX)));
    };

    const handleTouchMove = (e) => {
      if (!arenaRef.current || !e.touches[0]) return;
      const rect = arenaRef.current.getBoundingClientRect();
      const relativeX = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
      setBasketX(Math.max(8, Math.min(92, relativeX)));
    };

    window.addEventListener('keydown', handleKeyDown);
    const arenaEl = arenaRef.current;
    if (arenaEl) {
      arenaEl.addEventListener('mousemove', handleMouseMove);
      arenaEl.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (arenaEl) {
        arenaEl.removeEventListener('mousemove', handleMouseMove);
        arenaEl.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [gameState]);

  // Spawn falling treats and alarm clocks
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnItem = () => {
      const types = [
        { type: 'strawberry', points: 10, weight: 4 },
        { type: 'cake', points: 25, weight: 2 },
        { type: 'bow', points: 30, weight: 2 },
        { type: 'clock', points: -1, weight: 2 }, // danger!
      ];

      // Weighted random selection
      const totalWeight = types.reduce((acc, t) => acc + t.weight, 0);
      let rand = Math.random() * totalWeight;
      let selected = types[0];
      for (const t of types) {
        if (rand < t.weight) {
          selected = t;
          break;
        }
        rand -= t.weight;
      }

      const newItem = {
        id: Date.now() + Math.random(),
        type: selected.type,
        x: Math.floor(Math.random() * 80) + 10, // 10% to 90%
        y: 0,
        speed: 1.2 + Math.random() * 0.8,
      };

      setItems((prev) => [...prev, newItem]);
    };

    spawnTimerRef.current = setInterval(spawnItem, 800);
    return () => clearInterval(spawnTimerRef.current);
  }, [gameState]);

  // Main game physics loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const loop = () => {
      setItems((prevItems) => {
        const nextItems = [];
        let scoreDelta = 0;
        let lifeLost = false;

        for (const item of prevItems) {
          const newY = item.y + item.speed;

          // Check if item hit basket height (y around 80% to 92%)
          if (newY >= 80 && newY <= 90) {
            const distance = Math.abs(item.x - basketXRef.current);
            if (distance < 12) {
              // Caught in basket!
              if (item.type === 'clock') {
                lifeLost = true;
                soundManager.playBonkSound();
              } else {
                soundManager.playHeartSound();
                if (item.type === 'strawberry') scoreDelta += 10;
                if (item.type === 'cake') scoreDelta += 25;
                if (item.type === 'bow') scoreDelta += 30;
              }
              continue; // remove caught item
            }
          }

          // If fell past bottom (y > 98)
          if (newY > 98) {
            continue; // disappeared offscreen
          }

          nextItems.push({ ...item, y: newY });
        }

        if (scoreDelta > 0) {
          setScore((s) => s + scoreDelta);
        }

        if (lifeLost) {
          setLives((l) => {
            const nextL = l - 1;
            if (nextL <= 0) {
              setTimeout(handleGameOver, 50);
            }
            return nextL;
          });
        }

        return nextItems;
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [gameState]);

  const handleGameOver = () => {
    setGameState('gameover');
    soundManager.playVictorySound();
    if (score > highScore) {
      setHighScore(score);
    }
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B8B', '#FFD1DC', '#89CFF0', '#FCD34D'],
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border-2 border-pink-200 shadow-kawaii">
      {/* Game Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-pink-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🧺</span>
            <h3 className="text-lg font-bold text-pastel-berry">Catch the Birthday Treats!</h3>
          </div>
          <p className="text-xs text-pastel-berryLight mt-0.5">
            Move your picnic basket to catch strawberries, cakes & bows while dodging alarm clocks!
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-pink-50 rounded-2xl border border-pink-200 text-center">
            <span className="text-[10px] text-pastel-berryLight block font-bold">SCORE</span>
            <span className="text-base font-black text-pastel-pinkDeep tabular-nums">{score}</span>
          </div>

          <div className="px-3 py-1.5 bg-rose-50 rounded-2xl border border-rose-200 text-center">
            <span className="text-[10px] text-rose-600 block font-bold">LIVES</span>
            <div className="flex items-center gap-1 mt-0.5">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < lives ? 'fill-rose-500 text-rose-500' : 'fill-gray-200 text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Game Arena Canvas/DOM */}
      <div
        ref={arenaRef}
        className="mt-6 relative w-full h-80 max-w-lg mx-auto bg-gradient-to-b from-blue-50/70 via-pink-50/60 to-pink-100/70 rounded-3xl border-2 border-pink-200 overflow-hidden shadow-inner select-none cursor-ew-resize"
      >
        {/* Soft clouds background */}
        <div className="absolute top-4 left-6 text-2xl opacity-40">☁️</div>
        <div className="absolute top-10 right-8 text-3xl opacity-40">☁️</div>

        {/* Falling items */}
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute -translate-x-1/2 pointer-events-none transition-transform"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
            {item.type === 'strawberry' && <StrawberryIcon className="w-8 h-8 drop-shadow-sm" />}
            {item.type === 'cake' && <BirthdayCakeIcon className="w-9 h-9 drop-shadow-sm" />}
            {item.type === 'bow' && <HelloKittyBow className="w-8 h-8 drop-shadow-sm" />}
            {item.type === 'clock' && (
              <div className="animate-spin" style={{ animationDuration: '4s' }}>
                <AlarmClockIcon className="w-8 h-8 drop-shadow-sm" />
              </div>
            )}
          </div>
        ))}

        {/* The Basket (controlled by player) */}
        <div
          className="absolute bottom-3 -translate-x-1/2 pointer-events-none transition-all duration-75"
          style={{ left: `${basketX}%` }}
        >
          <KawaiiBasket className="w-20 h-14 drop-shadow-md" />
        </div>

        {/* Overlay screens: Start / Game Over */}
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 text-center z-30">
            {gameState === 'idle' ? (
              <>
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center border-2 border-pink-300 mb-3 text-3xl animate-bounceCute">
                  🍓
                </div>
                <h4 className="text-xl font-black text-pastel-berry">Catch the Sweet Treats!</h4>
                <p className="text-xs text-pastel-berryLight mt-1 max-w-xs">
                  Slide your mouse or use Left / Right arrow keys to catch yummy cakes and avoid noisy alarm clocks!
                </p>
                <button
                  onClick={startGame}
                  className="mt-5 flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold text-sm shadow-kawaii hover:scale-105 active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Catching!</span>
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center border-2 border-amber-300 mb-3 text-3xl animate-wiggle">
                  🎂
                </div>
                <h4 className="text-xl font-black text-pastel-berry">Sweet Run Complete!</h4>
                <p className="text-xs text-pastel-berryLight mt-1">
                  You caught <span className="font-bold text-rose-500 text-base">{score}</span> points of birthday treats!
                </p>
                {score >= highScore && score > 0 && (
                  <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold border border-amber-300">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Sweetest Catcher! 🎀</span>
                  </div>
                )}
                <button
                  onClick={startGame}
                  className="mt-5 flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold text-sm shadow-kawaii hover:scale-105 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Catch More!</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
