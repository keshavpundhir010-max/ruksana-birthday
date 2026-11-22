import React, { useState, useEffect } from 'react';
import { MascotIcon } from './MascotIcon';
import { soundManager } from '../../utils/audioSynth';
import { Volume2, VolumeX, Music, Heart, Sparkles, Settings2, PartyPopper } from 'lucide-react';

export const Navbar = ({
  happinessScore,
  onOpenSecretLetter,
  girlfriendName,
  nickname,
  yourName,
  birthdayDate,
  onUpdateProfile,
  onReplayPopup
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Profile edit draft states
  const [tempName, setTempName] = useState(girlfriendName);
  const [tempNick, setTempNick] = useState(nickname);
  const [tempYourName, setTempYourName] = useState(yourName);
  const [tempDate, setTempDate] = useState(birthdayDate);

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((state) => {
      setIsPlaying(state.isPlayingMusic);
      setIsMuted(state.isMuted);
    });
    return unsubscribe;
  }, []);

  const handleToggleMusic = () => {
    soundManager.toggleMusic();
  };

  const handleToggleMute = () => {
    soundManager.toggleMute();
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      soundManager.playPopSound();
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    soundManager.playSparkleSound();
    onUpdateProfile({
      girlfriendName: tempName.trim() || girlfriendName,
      nickname: tempNick.trim() || nickname,
      yourName: tempYourName.trim() || yourName,
      birthdayDate: tempDate.trim() || birthdayDate,
    });
    setShowSettingsModal(false);
  };

  return (
    <header className="sticky top-0 z-50 px-4 py-3 bg-[#FFF9FA]/90 backdrop-blur-md border-b-2 border-pastel-pink/50 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div 
          onClick={() => scrollTo('hero')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="p-1 bg-white rounded-2xl shadow-kawaii group-hover:scale-105 transition-transform border border-pink-200">
            <MascotIcon className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-pastel-berry tracking-tight">
                {girlfriendName}'s Birthday
              </span>
              <span className="text-sm animate-wiggle">🎀</span>
            </div>
            <p className="text-[11px] text-pastel-berryLight font-medium hidden sm:block">
              {nickname}
            </p>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/80 p-1.5 rounded-full border border-pink-200 shadow-inner">
          <button
            onClick={() => scrollTo('memories')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-pastel-berry hover:bg-pastel-pinkLight hover:text-pastel-pinkVibrant transition-colors"
          >
            📸 Archives
          </button>
          <button
            onClick={() => scrollTo('arcade')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-pastel-berry hover:bg-pastel-pinkLight hover:text-pastel-pinkVibrant transition-colors"
          >
            🎮 Arcade
          </button>
          <button
            onClick={() => scrollTo('sanctuary')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-pastel-berry hover:bg-pastel-pinkLight hover:text-pastel-pinkVibrant transition-colors"
          >
            🐾 Friends
          </button>
          <button
            onClick={() => scrollTo('finale')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-pastel-berry hover:bg-pastel-pinkLight hover:text-pastel-pinkVibrant transition-colors"
          >
            🎂 Wish & Letter
          </button>
        </nav>

        {/* Right side controls: Pop-up replay + Settings + Happiness meter + Audio synthesizer */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Replay Birthday Entrance Animation button */}
          <button
            onClick={onReplayPopup}
            title="Replay Birthday Entrance Animation"
            className="p-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-300 shadow-sm transition-all"
          >
            <PartyPopper className="w-4 h-4 text-pink-600 animate-wiggle" />
          </button>

          {/* Quick Settings Pill */}
          <button
            onClick={() => {
              setTempName(girlfriendName);
              setTempNick(nickname);
              setTempYourName(yourName);
              setTempDate(birthdayDate);
              setShowSettingsModal(true);
              soundManager.playPopSound();
            }}
            title="Edit Details"
            className="p-1.5 rounded-full bg-white text-pastel-berry border border-pink-200 hover:bg-pink-50 shadow-sm transition-all"
          >
            <Settings2 className="w-4 h-4 text-pink-500" />
          </button>

          {/* Happiness meter pill */}
          <button
            onClick={onOpenSecretLetter}
            title={happinessScore >= 100 ? "Bestie Letter Unlocked! Click to read" : `Sanctuary Happiness: ${happinessScore}%`}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              happinessScore >= 100
                ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white border-pink-400 shadow-kawaii-glow animate-bounceCute'
                : 'bg-white text-pastel-berry border-pink-200 hover:border-pink-300 shadow-sm'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${happinessScore >= 100 ? 'fill-white text-white' : 'text-pink-500 fill-pink-500'}`} />
            <span className="tabular-nums">{happinessScore}%</span>
            {happinessScore >= 100 && <Sparkles className="w-3.5 h-3.5 text-yellow-200" />}
          </button>

          {/* Music Play/Stop synthesized melody */}
          <button
            onClick={handleToggleMusic}
            title={isPlaying ? "Pause Birthday Melody" : "Play Chiptune Birthday Song"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all shadow-sm ${
              isPlaying
                ? 'bg-pink-100 text-pink-600 border-pink-300 animate-pulse'
                : 'bg-white text-pastel-berry border-pink-200 hover:bg-pink-50'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isPlaying ? 'Playing 🎶' : 'Play Song'}</span>
          </button>

          {/* Audio Mute/Unmute */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? "Unmute all sound effects" : "Mute sounds"}
            className="p-1.5 rounded-full bg-white text-pastel-berry border border-pink-200 hover:bg-pink-50 shadow-sm transition-all"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-pink-500" />}
          </button>
        </div>
      </div>

      {/* Quick Personalization Modal */}
      {showSettingsModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 border-4 border-pastel-pink shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center pb-3 border-b border-pink-100 mb-4">
              <h3 className="text-lg font-black text-pastel-berry">
                Personalize Bestie Celebration 🎀
              </h3>
              <p className="text-xs text-pastel-berryLight mt-0.5">
                Customize her name, funny nickname, and sign-off!
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-3.5 text-left text-xs font-bold">
              <div>
                <label className="block text-pastel-berry mb-1">Friend's Name:</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-pink-200 focus:outline-none focus:border-pink-400 font-semibold"
                  placeholder="e.g. Ruksana"
                />
              </div>

              <div>
                <label className="block text-pastel-berry mb-1">Funny Nickname / Title:</label>
                <input
                  type="text"
                  value={tempNick}
                  onChange={(e) => setTempNick(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-pink-200 focus:outline-none focus:border-pink-400 font-semibold"
                  placeholder="e.g. Ruksana Channnn 🎀"
                />
              </div>

              <div>
                <label className="block text-pastel-berry mb-1">Your Name / Sign-off:</label>
                <input
                  type="text"
                  value={tempYourName}
                  onChange={(e) => setTempYourName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-pink-200 focus:outline-none focus:border-pink-400 font-semibold"
                  placeholder="e.g. Your Partner in Crime"
                />
              </div>

              <div>
                <label className="block text-pastel-berry mb-1">Birthday Date:</label>
                <input
                  type="text"
                  value={tempDate}
                  onChange={(e) => setTempDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border-2 border-pink-200 focus:outline-none focus:border-pink-400 font-semibold"
                  placeholder="e.g. Today!"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-kawaii font-black hover:scale-105"
                >
                  Save Changes ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
