import React, { useState } from 'react';
import { HelloKittyBow } from '../shared/KawaiiSvgIcons';
import { BIRTHDAY_CONFIG } from '../../config/birthdayConfig';
import { soundManager } from '../../utils/audioSynth';
import confetti from 'canvas-confetti';
import { Sparkles, Mail, Heart, RefreshCw, Edit3, Check, Copy, RotateCcw } from 'lucide-react';

export const BirthdayFinale = ({ isLetterOpen, setIsLetterOpen, girlfriendName, yourName, birthdayDate }) => {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [allCandlesBlown, setAllCandlesBlown] = useState(false);
  const [isEditingLetter, setIsEditingLetter] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Load custom letter from localStorage if present
  const [letterContent, setLetterContent] = useState(() => {
    try {
      const saved = localStorage.getItem('hk_ruksana_letter_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      title: BIRTHDAY_CONFIG.LETTER.TITLE,
      paragraphs: BIRTHDAY_CONFIG.LETTER.PARAGRAPHS,
    };
  });

  const [editTitle, setEditTitle] = useState(letterContent.title);
  const [editText, setEditText] = useState(letterContent.paragraphs.join('\n\n'));

  // Blow single candle
  const handleBlowCandle = (index, e) => {
    e.stopPropagation();
    if (!candlesLit[index]) return;

    soundManager.playBlowCandleSound();

    setCandlesLit((prev) => {
      const next = [...prev];
      next[index] = false;

      if (next.every((c) => !c)) {
        handleAllCandlesBlown();
      }
      return next;
    });
  };

  // Blow all candles at once
  const handleBlowAll = () => {
    soundManager.playBlowCandleSound();
    setCandlesLit([false, false, false, false, false]);
    handleAllCandlesBlown();
  };

  const handleAllCandlesBlown = () => {
    setAllCandlesBlown(true);
    soundManager.playVictorySound();

    const end = Date.now() + 2.5 * 1000;
    const colors = ['#FF6B8B', '#FFD1DC', '#89CFF0', '#FCD34D', '#FFF', '#C084FC'];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleRelightCandles = () => {
    soundManager.playSparkleSound();
    setCandlesLit([true, true, true, true, true]);
    setAllCandlesBlown(false);
  };

  const handleOpenEnvelope = () => {
    soundManager.playPopSound();
    soundManager.playHeartSound();
    setIsLetterOpen(true);
  };

  const handleSaveLetter = () => {
    soundManager.playSparkleSound();
    const newParagraphs = editText.split('\n\n').filter((p) => p.trim() !== '');
    const updated = {
      title: editTitle,
      paragraphs: newParagraphs,
    };
    setLetterContent(updated);
    setIsEditingLetter(false);
    try {
      localStorage.setItem('hk_ruksana_letter_v3', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleResetLetter = () => {
    soundManager.playPopSound();
    const original = {
      title: BIRTHDAY_CONFIG.LETTER.TITLE,
      paragraphs: BIRTHDAY_CONFIG.LETTER.PARAGRAPHS,
    };
    setLetterContent(original);
    setEditTitle(original.title);
    setEditText(original.paragraphs.join('\n\n'));
    setIsEditingLetter(false);
    try {
      localStorage.removeItem('hk_ruksana_letter_v3');
    } catch (e) {}
  };

  const handleCopyLetter = () => {
    soundManager.playPopSound();
    const fullText = `${letterContent.title}\n\n${letterContent.paragraphs.join('\n\n')}\n\n${BIRTHDAY_CONFIG.LETTER.SIGN_OFF}\n${yourName}`;
    navigator.clipboard?.writeText(fullText);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  return (
    <section id="finale" className="relative py-16 px-4 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-pinkLight border border-pink-200 text-pastel-pinkDeep text-xs font-bold shadow-sm mb-3">
          <HelloKittyBow className="w-4 h-4" />
          <span>CHAPTER FOUR</span>
          <HelloKittyBow className="w-4 h-4" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-pastel-berry tracking-tight">
          Make a Wish & Bestie Letter 🎂💌
        </h2>
        <p className="mt-2 text-pastel-berryLight max-w-xl mx-auto text-sm sm:text-base">
          Click the glowing candles to blow them out and make your biggest wish, then crack open the wax-sealed bestie envelope!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* LEFT COLUMN: THE VIRTUAL BIRTHDAY CAKE */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-kawaii flex flex-col items-center text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1 text-xs font-black text-rose-500 bg-pink-50 px-3 py-1 rounded-full border border-pink-200 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{BIRTHDAY_CONFIG.CAKE.TITLE}</span>
          </div>

          <p className="text-xs text-pastel-berryLight max-w-xs mb-6">
            {allCandlesBlown
              ? BIRTHDAY_CONFIG.CAKE.BLOWN_MESSAGE
              : BIRTHDAY_CONFIG.CAKE.INSTRUCTION}
          </p>

          {/* 3D-Tiered Interactive Cake SVG */}
          <div className="relative w-64 h-64 my-2 select-none">
            {/* Candle flames & stems */}
            <div className="absolute top-4 inset-x-0 flex justify-center gap-5 z-20">
              {candlesLit.map((isLit, idx) => (
                <div
                  key={idx}
                  onClick={(e) => handleBlowCandle(idx, e)}
                  title={isLit ? "Click to blow out this candle!" : "Blown out"}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className="h-6 flex items-center justify-center">
                    {isLit ? (
                      <div className="w-3.5 h-5 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-pulse shadow-kawaii-glow group-hover:scale-125 transition-transform" />
                    ) : (
                      <div className="text-[10px] text-gray-400 opacity-60 animate-bounceCute">
                        💨
                      </div>
                    )}
                  </div>
                  <div className="w-2.5 h-10 rounded-sm bg-gradient-to-b from-pink-200 to-rose-300 border border-pink-400 shadow-sm" />
                </div>
              ))}
            </div>

            {/* Cake Tiers SVG */}
            <svg viewBox="0 0 200 180" className="w-full h-full drop-shadow-xl" fill="none">
              <ellipse cx="100" cy="165" rx="85" ry="12" fill="#FFFFFF" stroke="#4A2535" strokeWidth="3" />
              <ellipse cx="100" cy="163" rx="78" ry="9" fill="#FFF0F5" />

              <rect x="35" y="105" width="130" height="55" rx="10" fill="#FFF0F5" stroke="#4A2535" strokeWidth="3.5" />
              <path d="M 35 120 Q 50 135 65 120 Q 80 135 95 120 Q 110 135 125 120 Q 140 135 155 120 Q 165 130 165 105 L 35 105 Z" fill="#FF8FAB" stroke="#4A2535" strokeWidth="2.5" />
              <circle cx="55" cy="150" r="4" fill="#FF3366" />
              <circle cx="85" cy="150" r="4" fill="#FF3366" />
              <circle cx="115" cy="150" r="4" fill="#FF3366" />
              <circle cx="145" cy="150" r="4" fill="#FF3366" />

              <rect x="60" y="55" width="80" height="52" rx="8" fill="#FFFFFF" stroke="#4A2535" strokeWidth="3.5" />
              <path d="M 60 70 Q 75 82 85 70 Q 100 82 115 70 Q 130 82 140 70 L 140 55 L 60 55 Z" fill="#FF6B8B" stroke="#4A2535" strokeWidth="2.5" />

              <g transform="translate(85, 95) scale(0.3)">
                <ellipse cx="20" cy="20" rx="16" ry="12" transform="rotate(-20 20 20)" fill="#FF3366" stroke="#4A2535" strokeWidth="6" />
                <ellipse cx="60" cy="20" rx="16" ry="12" transform="rotate(20 60 20)" fill="#FF3366" stroke="#4A2535" strokeWidth="6" />
                <circle cx="40" cy="20" r="10" fill="#FF8FAB" stroke="#4A2535" strokeWidth="6" />
              </g>
            </svg>
          </div>

          {/* Action Button: Blow All or Relight */}
          <div className="mt-4 flex items-center gap-3">
            {!allCandlesBlown ? (
              <button
                onClick={handleBlowAll}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold text-xs shadow-kawaii hover:scale-105 active:scale-95 transition-all"
              >
                <span>Blow All Candles 💨🎂</span>
              </button>
            ) : (
              <button
                onClick={handleRelightCandles}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs border border-pink-300 hover:bg-pink-200 transition-all shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Light Candles Again ✨</span>
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: THE WAX-SEALED BESTIE ENVELOPE */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-kawaii flex flex-col items-center text-center relative">
          <div className="inline-flex items-center gap-1 text-xs font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200 mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>{BIRTHDAY_CONFIG.LETTER.TAG}</span>
          </div>

          <h3 className="text-xl font-extrabold text-pastel-berry mb-2">
            The Bestie Envelope 💌
          </h3>
          <p className="text-xs text-pastel-berryLight max-w-xs mb-6">
            A special message written just for you, Ruksana Chan. Click the wax seal to break the seal and read it!
          </p>

          {/* Envelope Graphic */}
          <div
            onClick={handleOpenEnvelope}
            className="w-full max-w-xs aspect-[4/3] bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 rounded-3xl border-4 border-pink-300 shadow-kawaii hover:shadow-kawaii-lg hover:scale-105 transition-all duration-300 cursor-pointer relative flex flex-col items-center justify-center p-6 group"
          >
            <div className="absolute top-0 inset-x-0 h-1/2 border-b-2 border-pink-300/60 pointer-events-none" />

            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 via-pink-600 to-rose-700 border-4 border-rose-300 shadow-kawaii-glow flex flex-col items-center justify-center text-white z-10 group-hover:scale-110 transition-transform">
              <span className="text-2xl animate-wiggle">🎀</span>
              <span className="text-[9px] font-black tracking-widest uppercase mt-0.5">
                {BIRTHDAY_CONFIG.LETTER.ENVELOPE_SEAL_TEXT}
              </span>
            </div>

            <span className="mt-4 text-xs font-bold text-pastel-berryLight group-hover:text-pink-600 transition-colors">
              Click to Open Bestie Letter ✨
            </span>
          </div>
        </div>
      </div>

      {/* Love Letter Modal (Triggered by envelope or 100% pet happiness) */}
      {isLetterOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setIsLetterOpen(false)}
        >
          <div
            className="bg-[#FFFDF9] rounded-3xl max-w-xl w-full p-6 sm:p-8 border-4 border-pastel-pink shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar: Edit toggle, Copy button, Close */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-pink-200/80 mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditingLetter(!isEditingLetter)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                    isEditingLetter
                      ? 'bg-rose-500 text-white border-rose-600'
                      : 'bg-white text-pastel-berry border-pink-200 hover:bg-pink-50'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditingLetter ? 'Cancel Editing' : 'Edit Letter'}</span>
                </button>

                {!isEditingLetter && (
                  <button
                    onClick={handleCopyLetter}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-pastel-berry border border-pink-200 hover:bg-pink-50 transition-all"
                  >
                    {copiedToast ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedToast ? 'Copied! 💖' : 'Copy'}</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => setIsLetterOpen(false)}
                className="px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
              >
                Close ✕
              </button>
            </div>

            {/* Letter Header */}
            <div className="text-center pb-3">
              <div className="inline-block p-2 bg-pink-50 rounded-2xl border border-pink-200 mb-2">
                <HelloKittyBow className="w-8 h-8 text-pink-500" />
              </div>

              {isEditingLetter ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-center text-lg sm:text-xl font-black text-pastel-berry border-2 border-pink-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-500"
                />
              ) : (
                <h3 className="text-xl sm:text-2xl font-black text-pastel-berry tracking-tight">
                  {letterContent.title}
                </h3>
              )}

              <p className="text-xs text-rose-500 font-bold mt-1">
                For {girlfriendName} • {birthdayDate}
              </p>
            </div>

            {/* Letter Body or Editor */}
            {isEditingLetter ? (
              <div className="mt-4 space-y-3">
                <label className="text-xs font-bold text-pastel-berryLight block">
                  Customize your bestie message (double enter for new paragraphs):
                </label>
                <textarea
                  rows={8}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-pink-300 text-sm text-[#4A2535] leading-relaxed focus:outline-none focus:border-pink-500 bg-white"
                />
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={handleResetLetter}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-rose-500 hover:bg-rose-50 border border-rose-200"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset to Default</span>
                  </button>

                  <button
                    onClick={handleSaveLetter}
                    className="flex items-center gap-1.5 px-6 py-2 rounded-full text-xs font-black text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-kawaii hover:scale-105"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save My Letter 🎀</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-4 text-sm sm:text-base text-[#4A2535] leading-relaxed font-medium">
                {letterContent.paragraphs.map((para, i) => (
                  <p key={i} className="first-letter:text-2xl first-letter:font-bold first-letter:text-pink-600">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Sign-off */}
            {!isEditingLetter && (
              <div className="mt-8 pt-4 border-t-2 border-pink-200/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-pastel-berryLight font-bold block">
                    {BIRTHDAY_CONFIG.LETTER.SIGN_OFF}
                  </span>
                  <span className="text-lg font-black text-pink-600 font-cursive">
                    {yourName} 💕
                  </span>
                </div>
                <div className="text-2xl">{BIRTHDAY_CONFIG.LETTER.STICKER}</div>
              </div>
            )}

            {/* Bottom Button */}
            {!isEditingLetter && (
              <button
                onClick={() => setIsLetterOpen(false)}
                className="mt-6 w-full py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold text-sm shadow-kawaii hover:scale-102 transition-transform"
              >
                Keep This Letter in the Bestie Archives 🎀
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
