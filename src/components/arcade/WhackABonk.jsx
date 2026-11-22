import React, { useState, useEffect, useRef } from 'react';
import { KuromiBunny, HelloKittyBow, StrawberryIcon, GiftBoxIcon } from '../shared/KawaiiSvgIcons';
import { soundManager } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';
import { Trophy, Play, RotateCcw, Flame } from 'lucide-react';

export const WhackABonk = () => {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeMole, setActiveMole] = useState(null); // { boxIndex: number, type: 'kuromi' | 'bow' | 'strawberry' }
  const [combo, setCombo] = useState(0);
  const [bonkPopups, setBonkPopups] = useState([]); // [{ id, text, boxIndex }]
  const timerRef = useRef(null);
  const moleTimerRef = useRef(null);

  // Start game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setCombo(0);
    setTimeLeft(30);
    setBonkPopups([]);
    soundManager.playPopSound();
  };

  // Main countdown timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [gameState, score]);

  // Mole pop logic
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnMole = () => {
      const boxIndex = Math.floor(Math.random() * 9);
      const rand = Math.random();
      let type = 'kuromi';
      if (rand > 0.8) type = 'bow';
      else if (rand > 0.6) type = 'strawberry';

      setActiveMole({ boxIndex, type, id: Date.now() });

      // Stay duration decreases as game progresses
      const stayDuration = Math.max(650, 1100 - (30 - timeLeft) * 15);
      moleTimerRef.current = setTimeout(() => {
        setActiveMole(null);
        // Missed breaks combo
        setCombo(0);
      }, stayDuration);
    };

    const intervalTime = Math.max(750, 1200 - (30 - timeLeft) * 15);
    const interval = setInterval(spawnMole, intervalTime);
    spawnMole();

    return () => {
      clearInterval(interval);
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
    };
  }, [gameState, timeLeft]);

  const endGame = () => {
    setGameState('gameover');
    setActiveMole(null);
    soundManager.playVictorySound();

    if (score > highScore) {
      setHighScore(score);
    }

    // Celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6B8B', '#FFD1DC', '#89CFF0', '#FCD34D']
    });
  };

  const handleBonk = (boxIndex, e) => {
    e.stopPropagation();
    if (gameState !== 'playing' || !activeMole || activeMole.boxIndex !== boxIndex) return;

    // Bonk sound
    soundManager.playBonkSound();

    let points = 10;
    if (activeMole.type === 'bow') points = 25;
    if (activeMole.type === 'strawberry') points = 15;

    const newCombo = combo + 1;
    setCombo(newCombo);

    const bonus = Math.floor(newCombo / 3) * 5;
    const totalPoints = points + bonus;

    setScore((prev) => prev + totalPoints);

    // Show floating "BONK! +15" popup
    const popupId = Date.now();
    setBonkPopups((prev) => [
      ...prev,
      { id: popupId, text: `BONK! +${totalPoints}`, boxIndex }
    ]);

    setTimeout(() => {
      setBonkPopups((prev) => prev.filter((p) => p.id !== popupId));
    }, 600);

    // Hide mole immediately
    if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
    setActiveMole(null);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border-2 border-pink-200 shadow-kawaii">
      {/* Game Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-pink-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔨</span>
            <h3 className="text-lg font-bold text-pastel-berry">Whack-a-Kuromi & Bow Bonk!</h3>
          </div>
          <p className="text-xs text-pastel-berryLight mt-0.5">
            Use your Hello Kitty toy hammer to bonk critters popping from pastel gift boxes!
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-pink-50 rounded-2xl border border-pink-200 text-center">
            <span className="text-[10px] text-pastel-berryLight block font-bold">SCORE</span>
            <span className="text-lg font-black text-pastel-pinkDeep tabular-nums">{score}</span>
          </div>

          <div className="px-3 py-1.5 bg-amber-50 rounded-2xl border border-amber-200 text-center">
            <span className="text-[10px] text-amber-600 block font-bold">TIME</span>
            <span className="text-lg font-black text-amber-700 tabular-nums">{timeLeft}s</span>
          </div>

          <div className="px-3 py-1.5 bg-purple-50 rounded-2xl border border-purple-200 text-center">
            <span className="text-[10px] text-purple-600 block font-bold flex items-center justify-center gap-0.5">
              <Flame className="w-2.5 h-2.5 text-rose-500" /> COMBO
            </span>
            <span className="text-lg font-black text-purple-700 tabular-nums">{combo}x</span>
          </div>
        </div>
      </div>

      {/* 3x3 Gift Box Arena */}
      <div className="mt-6 relative max-w-md mx-auto aspect-square grid grid-cols-3 gap-3 p-3 bg-gradient-to-b from-pink-50/80 to-pink-100/60 rounded-3xl border-2 border-pink-200 shadow-inner">
        {[...Array(9)].map((_, i) => {
          const isMoleHere = activeMole && activeMole.boxIndex === i;
          const moleType = activeMole?.type;
          const popups = bonkPopups.filter((p) => p.boxIndex === i);

          return (
            <div
              key={i}
              onClick={(e) => handleBonk(i, e)}
              className="relative rounded-2xl bg-white/90 border-2 border-pink-200 overflow-hidden flex flex-col items-center justify-end pb-2 cursor-pointer shadow-sm hover:border-pink-300 transition-colors select-none"
            >
              {/* Floating score popup text */}
              {popups.map((p) => (
                <div
                  key={p.id}
                  className="absolute top-2 left-1/2 -translate-x-1/2 pointer-events-none text-xs font-black text-rose-500 bg-white/95 px-2 py-0.5 rounded-full shadow-md animate-bounceCute border border-rose-200 z-30"
                >
                  {p.text}
                </div>
              ))}

              {/* Critter Pop Up Animation */}
              <div
                className={`transition-all duration-200 transform ${
                  isMoleHere
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-12 scale-50 opacity-0 pointer-events-none'
                } z-10`}
              >
                {moleType === 'kuromi' && <KuromiBunny className="w-16 h-16 drop-shadow-md" />}
                {moleType === 'bow' && (
                  <div className="p-2 animate-bounceCute">
                    <HelloKittyBow className="w-14 h-14 drop-shadow-md" />
                  </div>
                )}
                {moleType === 'strawberry' && (
                  <div className="p-2 animate-wiggle">
                    <StrawberryIcon className="w-14 h-14 drop-shadow-md" />
                  </div>
                )}
              </div>

              {/* Gift Box Base at Bottom */}
              <div className="w-full flex items-center justify-center pt-1 border-t border-pink-100 bg-pastel-pinkLight/50">
                <GiftBoxIcon className="w-8 h-8 opacity-75" />
              </div>
            </div>
          );
        })}

        {/* Start / Gameover Overlays */}
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 text-center z-40">
            {gameState === 'idle' ? (
              <>
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center border-2 border-pink-300 mb-3 text-2xl animate-bounceCute">
                  🎀
                </div>
                <h4 className="text-xl font-black text-pastel-berry">Ready to Bonk?</h4>
                <p className="text-xs text-pastel-berryLight mt-1 max-w-xs">
                  Bonk Kuromi & bows as fast as you can before the 30-second timer runs out!
                </p>
                <button
                  onClick={startGame}
                  className="mt-5 flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold text-sm shadow-kawaii hover:scale-105 active:scale-95 transition-all"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start Bonking!</span>
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center border-2 border-amber-300 mb-3 text-2xl animate-wiggle">
                  👑
                </div>
                <h4 className="text-xl font-black text-pastel-berry">Round Complete!</h4>
                <p className="text-xs text-pastel-berryLight mt-1">
                  You scored <span className="font-bold text-rose-500 text-base">{score}</span> points!
                </p>
                {score >= highScore && score > 0 && (
                  <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold border border-amber-300">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>New Personal Best! 🎉</span>
                  </div>
                )}
                <button
                  onClick={startGame}
                  className="mt-5 flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold text-sm shadow-kawaii hover:scale-105 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Again!</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
