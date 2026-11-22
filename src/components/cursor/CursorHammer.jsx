import React, { useEffect, useState, useRef } from 'react';
import { HelloKittyHammerSvg } from '../shared/KawaiiSvgIcons';
import { soundManager } from '../../utils/audioSynth';

export const CursorHammer = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isBonking, setIsBonking] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Check if the current device has a fine pointer (desktop mouse/trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    const handleMediaChange = (e) => setIsFinePointer(e.matches);
    mediaQuery.addEventListener?.('change', handleMediaChange);

    if (!mediaQuery.matches) return;

    // Add custom cursor class to body so default pointer is hidden only on desktop
    document.body.classList.add('cursor-none');

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e) => {
      setIsBonking(true);
      soundManager.playBonkSound();

      // Spawn burst of 6 mini stars & hearts at impact position
      const newParticles = [];
      const symbols = ['⭐', '💖', '✨', '🎀', '🌸', '💫'];
      
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6 + (Math.random() - 0.5) * 0.5;
        const speed = 25 + Math.random() * 30;
        newParticles.push({
          id: ++particleIdRef.current,
          x: e.clientX,
          y: e.clientY - 10,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed - 20, // bias upward
          symbol: symbols[i % symbols.length],
          scale: 0.8 + Math.random() * 0.5
        });
      }

      setParticles((prev) => [...prev.slice(-18), ...newParticles]);

      setTimeout(() => {
        setIsBonking(false);
      }, 160);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.body.classList.remove('cursor-none');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      mediaQuery.removeEventListener?.('change', handleMediaChange);
    };
  }, []);

  // Clean up finished particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles([]);
    }, 600);
    return () => clearTimeout(timer);
  }, [particles]);

  if (!isFinePointer) return null;

  return (
    <>
      {/* Floating particles from hammer hits */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="fixed pointer-events-none z-[9999] select-none text-base transition-all duration-500 ease-out animate-ping"
          style={{
            left: `${p.x + p.dx}px`,
            top: `${p.y + p.dy}px`,
            transform: `scale(${p.scale})`,
            opacity: 0.9,
          }}
        >
          {p.symbol}
        </span>
      ))}

      {/* The Hello Kitty Toy Hammer Cursor */}
      <div
        className="fixed pointer-events-none z-[99999] transition-transform duration-75 will-change-transform"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          // Center the hit surface of the hammer on the pointer tip
          transform: `translate(-28px, -28px) ${
            isBonking ? 'rotate(18deg) scale(0.92)' : 'rotate(-12deg) scale(1)'
          }`,
          transformOrigin: '28px 28px',
          filter: 'drop-shadow(2px 5px 6px rgba(74, 37, 53, 0.25))',
        }}
      >
        <HelloKittyHammerSvg className="w-14 h-14" />
      </div>
    </>
  );
};
