import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { BackgroundDecor } from './components/common/BackgroundDecor';
import { CursorHammer } from './components/cursor/CursorHammer';
import { PhotoGallery } from './components/gallery/PhotoGallery';
import { MiniGamesHub } from './components/arcade/MiniGamesHub';
import { VirtualPetSanctuary } from './components/sanctuary/VirtualPetSanctuary';
import { BirthdayFinale } from './components/finale/BirthdayFinale';
import { BirthdayEntranceAnimation } from './components/common/BirthdayEntranceAnimation';
import { MascotIcon } from './components/common/MascotIcon';
import { HelloKittyBow } from './components/shared/KawaiiSvgIcons';
import { BIRTHDAY_CONFIG } from './config/birthdayConfig';
import { soundManager } from './utils/audioSynth';
import { Sparkles, ChevronDown, Cake, PartyPopper } from 'lucide-react';

export default function App() {
  const [happinessScore, setHappinessScore] = useState(30);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showPopupGreeting, setShowPopupGreeting] = useState(true);

  // Profile state for Ruksana
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('hk_ruksana_names_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      girlfriendName: BIRTHDAY_CONFIG.GIRLFRIEND_NAME,
      nickname: BIRTHDAY_CONFIG.GIRLFRIEND_NICKNAME,
      yourName: BIRTHDAY_CONFIG.YOUR_NAME,
      birthdayDate: BIRTHDAY_CONFIG.BIRTHDAY_DATE,
    };
  });

  const handleUpdateProfile = (newProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('hk_ruksana_names_v3', JSON.stringify(newProfile));
    } catch (e) {}
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      soundManager.playPopSound();
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* 🎀 Full-Screen Celebratory Opening Animation (No boxes, pure kawaii splash!) */}
      {showPopupGreeting && (
        <BirthdayEntranceAnimation
          onComplete={() => setShowPopupGreeting(false)}
        />
      )}

      {/* 🔨 Custom Desktop Hello Kitty Toy Hammer Cursor */}
      <CursorHammer />

      {/* 🌸 Ambient Floating Decor (Clouds, Stars, Hearts, Ribbons) */}
      <BackgroundDecor />

      {/* 🎀 Navigation Header */}
      <Navbar
        happinessScore={happinessScore}
        onOpenSecretLetter={() => setIsLetterOpen(true)}
        girlfriendName={profile.girlfriendName}
        nickname={profile.nickname}
        yourName={profile.yourName}
        birthdayDate={profile.birthdayDate}
        onUpdateProfile={handleUpdateProfile}
        onReplayPopup={() => setShowPopupGreeting(true)}
      />

      <main className="relative z-10">
        {/* 🌟 HERO BANNER */}
        <section
          id="hero"
          className="relative pt-12 pb-20 px-4 max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border-2 border-pink-200 text-pastel-pinkDeep text-xs font-black shadow-kawaii mb-6 animate-float">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{BIRTHDAY_CONFIG.HERO_BADGE}</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>

          {/* Central Hero Mascot with Pink Bow */}
          <div className="relative mb-6 group cursor-pointer" onClick={() => soundManager.playHeartSound()}>
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-white to-pink-100 border-4 border-pastel-pink shadow-kawaii-lg flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-300">
              <MascotIcon className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-md" />
            </div>

            <div className="absolute -bottom-2 right-2 bg-white p-2 rounded-2xl shadow-kawaii border-2 border-pink-200 animate-wiggle">
              <HelloKittyBow className="w-8 h-8" />
            </div>
          </div>

          {/* Headline Greetings */}
          <h1 className="text-4xl sm:text-6xl font-black text-pastel-berry tracking-tight leading-tight">
            {BIRTHDAY_CONFIG.HERO_HEADLINE}{' '}
            <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-purple-600 bg-clip-text text-transparent underline decoration-pink-300 decoration-wavy decoration-2">
              Ruksana Channnn!
            </span>{' '}
            🎀✨
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-pastel-berryLight max-w-2xl mx-auto leading-relaxed font-medium">
            {BIRTHDAY_CONFIG.HERO_SUBTITLE}
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('memories')}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold text-sm shadow-kawaii hover:scale-105 active:scale-95 transition-all"
            >
              <span>The Ruksana Archives 📸</span>
            </button>

            <button
              onClick={() => scrollToSection('arcade')}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-pastel-berry font-extrabold text-sm border-2 border-pink-200 hover:bg-pink-50 shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <span>Play Mini-Games 🎮</span>
            </button>

            <button
              onClick={() => scrollToSection('finale')}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-pastel-blueLight text-blue-800 font-extrabold text-sm border-2 border-blue-200 hover:bg-blue-100 shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <Cake className="w-4 h-4 text-blue-500" />
              <span>Blow Cake Candles 🎂</span>
            </button>

            <button
              onClick={() => setShowPopupGreeting(true)}
              title="Replay opening celebration animation"
              className="flex items-center gap-1.5 px-4 py-3 rounded-full bg-pink-100 text-pink-700 font-extrabold text-xs border border-pink-300 hover:bg-pink-200 transition-all shadow-sm"
            >
              <PartyPopper className="w-4 h-4 text-pink-600" />
              <span>Replay Animation 🎀</span>
            </button>
          </div>

          <div className="mt-12 text-pink-300 animate-bounce">
            <ChevronDown className="w-6 h-6 mx-auto cursor-pointer" onClick={() => scrollToSection('memories')} />
          </div>
        </section>

        {/* 📸 SECTION 1: PHOTO GALLERY ("The Ruksana Archives") */}
        <PhotoGallery />

        {/* 🎮 SECTION 2: KAWAII ARCADE (3 Mini-Games) */}
        <MiniGamesHub />

        {/* 🐾 SECTION 3: VIRTUAL PET SANCTUARY */}
        <VirtualPetSanctuary
          happinessScore={happinessScore}
          setHappinessScore={setHappinessScore}
          onOpenSecretLetter={() => setIsLetterOpen(true)}
        />

        {/* 🎂 SECTION 4: BIRTHDAY FINALE (Cake & Bestie Envelope) */}
        <BirthdayFinale
          isLetterOpen={isLetterOpen}
          setIsLetterOpen={setIsLetterOpen}
          girlfriendName={profile.girlfriendName}
          yourName={profile.yourName}
          birthdayDate={profile.birthdayDate}
        />
      </main>

      {/* 🎀 KAWAII FOOTER */}
      <footer className="relative py-12 px-4 border-t-2 border-pink-200/80 bg-white/80 backdrop-blur-md text-center mt-16 z-10">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="p-2 bg-pink-50 rounded-full border border-pink-200 mb-3">
            <MascotIcon className="w-10 h-10" />
          </div>
          <p className="text-sm font-bold text-pastel-berry">
            Handcrafted with infinite bestie appreciation for {profile.girlfriendName} 🎀✨
          </p>
          <p className="text-xs text-pastel-berryLight mt-1">
            {profile.yourName} • Wishing you an epic, chaotic, and wonderful birthday! 🎉
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-lg">
            <span>🎀</span>
            <span>🍄</span>
            <span>🍕</span>
            <span>🧋</span>
            <span>👑</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
