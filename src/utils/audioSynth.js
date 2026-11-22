/**
 * 🎵 Web Audio API Sound Synthesizer
 * Zero-dependency, 100% offline, chiptune/music-box melody & sound effects generator.
 */

class KawaiiAudioSynth {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.currentNoteIndex = 0;
    this.isMuted = false;
    this.volume = 0.5;
    this.autoStopTimer = null;
    this.subscribers = new Set();
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach(cb => cb({
      isPlayingMusic: this.isPlayingMusic,
      isMuted: this.isMuted,
      volume: this.volume
    }));
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.isMuted && this.isPlayingMusic) {
      this.stopMusic();
    }
    this.notify();
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.notify();
  }

  // 🎀 Play cute wooden/toy mallet bonk sound
  playBonkSound() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      // Pitch drop from 520Hz to 160Hz for that bouncy "boing-bonk" feel
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.12);

      gain.gain.setValueAtTime(0.35 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn("Audio bonk error:", e);
    }
  }

  // 🍓 Bubble pop sound
  playPopSound() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

      gain.gain.setValueAtTime(0.3 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      console.warn("Audio pop error:", e);
    }
  }

  // ✨ Twinkly heart chime
  playHeartSound() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.18 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.26);
      });
    } catch (e) {
      console.warn("Audio heart error:", e);
    }
  }

  // 🎂 Candle blow / wind whoosh sound
  playBlowCandleSound() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      // Soft filtered noise simulation
      const bufferSize = this.ctx.sampleRate * 0.2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.2);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {
      console.warn("Audio blow error:", e);
    }
  }

  // 👑 Fanfare / Victory chime
  playVictorySound() {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      arpeggio.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime + i * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.25 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + (i === arpeggio.length - 1 ? 0.6 : 0.25));

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.65);
      });
    } catch (e) {
      console.warn("Audio victory error:", e);
    }
  }

  // 🎶 Sweet Chiptune / Music-Box "Happy Birthday" Melody
  startHappyBirthdayMusic(durationSeconds = 0) {
    if (this.isPlayingMusic) return;
    try {
      this.init();
      this.isPlayingMusic = true;
      this.notify();

      if (this.autoStopTimer) {
        clearTimeout(this.autoStopTimer);
        this.autoStopTimer = null;
      }

      if (durationSeconds > 0) {
        this.autoStopTimer = setTimeout(() => {
          this.stopMusic();
        }, durationSeconds * 1000);
      }

      // Notes for "Happy Birthday to You" (Key of C)
      // [Frequency, Duration in beats]
      const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88;
      const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99, A5 = 880.00;

      const melody = [
        { note: G4, dur: 0.75 }, { note: G4, dur: 0.25 }, { note: A4, dur: 1.0 }, { note: G4, dur: 1.0 }, { note: C5, dur: 1.0 }, { note: B4, dur: 2.0 },
        { note: G4, dur: 0.75 }, { note: G4, dur: 0.25 }, { note: A4, dur: 1.0 }, { note: G4, dur: 1.0 }, { note: D5, dur: 1.0 }, { note: C5, dur: 2.0 },
        { note: G4, dur: 0.75 }, { note: G4, dur: 0.25 }, { note: G5, dur: 1.0 }, { note: E5, dur: 1.0 }, { note: C5, dur: 1.0 }, { note: B4, dur: 1.0 }, { note: A4, dur: 1.5 },
        { note: F5, dur: 0.75 }, { note: F5, dur: 0.25 }, { note: E5, dur: 1.0 }, { note: C5, dur: 1.0 }, { note: D5, dur: 1.0 }, { note: C5, dur: 2.5 }
      ];

      const tempoMs = 450; // ms per beat

      const playNext = (index) => {
        if (!this.isPlayingMusic || this.isMuted) return;

        const item = melody[index % melody.length];
        const noteFreq = item.note;
        const noteDuration = (item.dur * tempoMs) / 1000;

        // Music box sound: Bell-like sine + subtle octave overtone
        if (this.ctx && noteFreq > 0) {
          const now = this.ctx.currentTime;
          
          // Primary bell tone
          const osc1 = this.ctx.createOscillator();
          const gain1 = this.ctx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(noteFreq, now);
          gain1.gain.setValueAtTime(0.22 * this.volume, now);
          gain1.gain.exponentialRampToValueAtTime(0.001, now + noteDuration * 0.9);
          osc1.connect(gain1);
          gain1.connect(this.ctx.destination);
          osc1.start(now);
          osc1.stop(now + noteDuration);

          // Overtone sparkle (one octave higher, soft decay)
          const osc2 = this.ctx.createOscillator();
          const gain2 = this.ctx.createGain();
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(noteFreq * 2, now);
          gain2.gain.setValueAtTime(0.08 * this.volume, now);
          gain2.gain.exponentialRampToValueAtTime(0.0005, now + noteDuration * 0.5);
          osc2.connect(gain2);
          gain2.connect(this.ctx.destination);
          osc2.start(now);
          osc2.stop(now + noteDuration);
        }

        this.musicTimer = setTimeout(() => {
          playNext(index + 1);
        }, item.dur * tempoMs);
      };

      playNext(0);
    } catch (e) {
      console.warn("Audio melody start error:", e);
    }
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.autoStopTimer) {
      clearTimeout(this.autoStopTimer);
      this.autoStopTimer = null;
    }
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    this.notify();
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopMusic();
    } else {
      this.startHappyBirthdayMusic();
    }
  }
}

export const soundManager = new KawaiiAudioSynth();
