import React from 'react';

/**
 * 🎀 Kawaii SVG Icons & Mascot Vectors
 * 100% vector, zero external dependencies, sharp at any scale.
 */

// 🐱 Hello Kitty Face with Bow
export const HelloKittyFace = ({ className = "w-12 h-12", withWhiskers = true, bowColor = "#FF6B8B" }) => (
  <svg viewBox="0 0 100 85" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Ear */}
    <path d="M 20 40 L 12 12 L 36 24 Z" fill="#FFFFFF" stroke="#4A2535" strokeWidth="4" strokeLinejoin="round" />
    {/* Right Ear */}
    <path d="M 80 40 L 88 12 L 64 24 Z" fill="#FFFFFF" stroke="#4A2535" strokeWidth="4" strokeLinejoin="round" />
    {/* Head Outline */}
    <ellipse cx="50" cy="48" rx="42" ry="32" fill="#FFFFFF" stroke="#4A2535" strokeWidth="4" />
    
    {/* Rosy Cheeks */}
    <ellipse cx="26" cy="54" rx="6" ry="3.5" fill="#FFD1DC" opacity="0.8" />
    <ellipse cx="74" cy="54" rx="6" ry="3.5" fill="#FFD1DC" opacity="0.8" />

    {/* Whiskers */}
    {withWhiskers && (
      <>
        {/* Left Whiskers */}
        <line x1="8" y1="46" x2="22" y2="48" stroke="#4A2535" strokeWidth="3" strokeLinecap="round" />
        <line x1="6" y1="53" x2="21" y2="53" stroke="#4A2535" strokeWidth="3" strokeLinecap="round" />
        <line x1="8" y1="60" x2="22" y2="58" stroke="#4A2535" strokeWidth="3" strokeLinecap="round" />
        {/* Right Whiskers */}
        <line x1="92" y1="46" x2="78" y2="48" stroke="#4A2535" strokeWidth="3" strokeLinecap="round" />
        <line x1="94" y1="53" x2="79" y2="53" stroke="#4A2535" strokeWidth="3" strokeLinecap="round" />
        <line x1="92" y1="60" x2="78" y2="58" stroke="#4A2535" strokeWidth="3" strokeLinecap="round" />
      </>
    )}

    {/* Eyes */}
    <ellipse cx="36" cy="49" rx="3.5" ry="5.5" fill="#4A2535" />
    <circle cx="35" cy="47" r="1.5" fill="#FFFFFF" />
    <ellipse cx="64" cy="49" rx="3.5" ry="5.5" fill="#4A2535" />
    <circle cx="63" cy="47" r="1.5" fill="#FFFFFF" />

    {/* Cute Yellow Nose */}
    <ellipse cx="50" cy="55" rx="5" ry="3.5" fill="#FCD34D" stroke="#4A2535" strokeWidth="1.8" />

    {/* Iconic Hello Kitty Pink Bow on Right Ear */}
    <g transform="translate(62, 10)">
      {/* Left Wing */}
      <ellipse cx="5" cy="14" rx="10" ry="7" transform="rotate(-20 5 14)" fill={bowColor} stroke="#4A2535" strokeWidth="2.5" />
      {/* Right Wing */}
      <ellipse cx="23" cy="14" rx="10" ry="7" transform="rotate(20 23 14)" fill={bowColor} stroke="#4A2535" strokeWidth="2.5" />
      {/* Center Knot */}
      <circle cx="14" cy="14" r="6" fill="#FF8FAB" stroke="#4A2535" strokeWidth="2.5" />
      {/* Center Highlight */}
      <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
    </g>
  </svg>
);

// 🎀 Iconic Hello Kitty Bow Vector
export const HelloKittyBow = ({ className = "w-8 h-8", color = "#FF6B8B", stroke = "#4A2535" }) => (
  <svg viewBox="0 0 100 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Loop */}
    <path d="M 45 35 C 20 10 5 20 15 45 C 20 58 40 45 45 38 Z" fill={color} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
    <circle cx="28" cy="32" r="3" fill="#FFFFFF" opacity="0.6" />
    
    {/* Right Loop */}
    <path d="M 55 35 C 80 10 95 20 85 45 C 80 58 60 45 55 38 Z" fill={color} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
    <circle cx="72" cy="32" r="3" fill="#FFFFFF" opacity="0.6" />

    {/* Center Knot */}
    <circle cx="50" cy="36" r="14" fill="#FF9EB5" stroke={stroke} strokeWidth="5" />
    <ellipse cx="46" cy="32" rx="4" ry="2.5" fill="#FFFFFF" />
  </svg>
);

// 🔨 The Custom Hello Kitty Toy Hammer (Toy Mallet)
export const HelloKittyHammerSvg = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-25 60 60)">
      {/* Handle */}
      <rect x="52" y="45" width="16" height="68" rx="8" fill="#FEE2E2" stroke="#4A2535" strokeWidth="4" />
      {/* Grip wraps / stripes */}
      <line x1="53" y1="65" x2="67" y2="65" stroke="#FF9EB5" strokeWidth="3" />
      <line x1="53" y1="80" x2="67" y2="80" stroke="#FF9EB5" strokeWidth="3" />
      <line x1="53" y1="95" x2="67" y2="95" stroke="#FF9EB5" strokeWidth="3" />
      {/* Handle bottom round stopper */}
      <circle cx="60" cy="112" r="9" fill="#FF6B8B" stroke="#4A2535" strokeWidth="3.5" />
      <circle cx="58" cy="110" r="2.5" fill="#FFFFFF" />

      {/* Hammer Mallet Body (horizontal pink cylinder) */}
      <rect x="20" y="20" width="80" height="36" rx="10" fill="#FF8FAB" stroke="#4A2535" strokeWidth="4.5" />
      {/* Subtle shine highlight on mallet */}
      <rect x="25" y="23" width="70" height="6" rx="3" fill="#FFD1DC" opacity="0.7" />

      {/* Left White Cushion Cap with Heart */}
      <rect x="14" y="18" width="12" height="40" rx="6" fill="#FFFFFF" stroke="#4A2535" strokeWidth="4" />
      <path d="M 17 38 C 17 35 22 35 22 38 C 22 41 17 44 17 44 C 17 44 12 41 12 38 C 12 35 17 35 17 38 Z" fill="#FF6B8B" transform="rotate(-90 17 38)" />

      {/* Right White Cushion Cap with Heart */}
      <rect x="94" y="18" width="12" height="40" rx="6" fill="#FFFFFF" stroke="#4A2535" strokeWidth="4" />
      <path d="M 103 38 C 103 35 108 35 108 38 C 108 41 103 44 103 44 C 103 44 98 41 98 38 C 98 35 103 35 103 38 Z" fill="#FF6B8B" transform="rotate(90 103 38)" />

      {/* Cute Hello Kitty Face Badge right on the hammer head */}
      <ellipse cx="60" cy="38" rx="12" ry="9" fill="#FFFFFF" stroke="#4A2535" strokeWidth="2.5" />
      <ellipse cx="56" cy="38" rx="1" ry="1.5" fill="#4A2535" />
      <ellipse cx="64" cy="38" rx="1" ry="1.5" fill="#4A2535" />
      <ellipse cx="60" cy="40" rx="1.5" ry="1" fill="#FCD34D" />

      {/* Big Decorative Bow on Mallet Neck */}
      <g transform="translate(42, 42) scale(0.35)">
        <ellipse cx="20" cy="20" rx="16" ry="12" transform="rotate(-20 20 20)" fill="#FF3366" stroke="#4A2535" strokeWidth="6" />
        <ellipse cx="60" cy="20" rx="16" ry="12" transform="rotate(20 60 20)" fill="#FF3366" stroke="#4A2535" strokeWidth="6" />
        <circle cx="40" cy="20" r="10" fill="#FF8FAB" stroke="#4A2535" strokeWidth="6" />
      </g>
    </g>
  </svg>
);

// 🐶 Cinnabun (Floppy-Eared Sky Pup)
export const CinnabunPet = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Floppy Left Ear */}
    <path d="M 38 42 C 20 30 0 45 4 65 C 8 80 30 75 42 58 Z" fill="#FFFFFF" stroke="#4A2535" strokeWidth="3.5" />
    <path d="M 12 55 C 14 65 24 68 28 60" stroke="#BFE3F7" strokeWidth="3" strokeLinecap="round" />

    {/* Floppy Right Ear */}
    <path d="M 82 42 C 100 30 120 45 116 65 C 112 80 90 75 78 58 Z" fill="#FFFFFF" stroke="#4A2535" strokeWidth="3.5" />
    <path d="M 108 55 C 106 65 96 68 92 60" stroke="#BFE3F7" strokeWidth="3" strokeLinecap="round" />

    {/* Chubby Round Body */}
    <ellipse cx="60" cy="74" rx="28" ry="18" fill="#FFFFFF" stroke="#4A2535" strokeWidth="3.5" />

    {/* Cute Paws */}
    <ellipse cx="48" cy="88" rx="7" ry="5" fill="#FFFFFF" stroke="#4A2535" strokeWidth="3" />
    <ellipse cx="72" cy="88" rx="7" ry="5" fill="#FFFFFF" stroke="#4A2535" strokeWidth="3" />

    {/* Head */}
    <ellipse cx="60" cy="46" rx="30" ry="24" fill="#FFFFFF" stroke="#4A2535" strokeWidth="3.5" />

    {/* Rosy Cheeks */}
    <circle cx="40" cy="52" r="5" fill="#FFB6C6" opacity="0.8" />
    <circle cx="80" cy="52" r="5" fill="#FFB6C6" opacity="0.8" />

    {/* Sparkling Blue Eyes */}
    <ellipse cx="46" cy="46" rx="3.5" ry="5" fill="#3B82F6" stroke="#4A2535" strokeWidth="1.5" />
    <circle cx="45" cy="44" r="1.5" fill="#FFFFFF" />
    <ellipse cx="74" cy="46" rx="3.5" ry="5" fill="#3B82F6" stroke="#4A2535" strokeWidth="1.5" />
    <circle cx="73" cy="44" r="1.5" fill="#FFFFFF" />

    {/* Tiny Nose & W-Mouth */}
    <circle cx="60" cy="51" r="1.5" fill="#4A2535" />
    <path d="M 55 54 C 57 57 60 56 60 54 C 60 56 63 57 65 54" stroke="#4A2535" strokeWidth="2" strokeLinecap="round" />

    {/* Baby Blue Neck Ribbon */}
    <path d="M 46 64 C 54 67 66 67 74 64" stroke="#89CFF0" strokeWidth="5" strokeLinecap="round" />
    <circle cx="60" cy="66" r="3.5" fill="#BFE3F7" stroke="#4A2535" strokeWidth="1.5" />
  </svg>
);

// 🍮 Pudding (Golden Sleepy Bear/Pup with Beret)
export const PuddingPet = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="60" cy="74" rx="32" ry="20" fill="#FEF08A" stroke="#4A2535" strokeWidth="3.5" />

    {/* Paws */}
    <ellipse cx="44" cy="88" rx="8" ry="6" fill="#FEF08A" stroke="#4A2535" strokeWidth="3" />
    <ellipse cx="76" cy="88" rx="8" ry="6" fill="#FEF08A" stroke="#4A2535" strokeWidth="3" />

    {/* Round Head */}
    <ellipse cx="60" cy="48" rx="34" ry="27" fill="#FEF08A" stroke="#4A2535" strokeWidth="3.5" />

    {/* Droopy Left Ear */}
    <path d="M 32 38 C 18 36 18 60 30 62 Z" fill="#FEF08A" stroke="#4A2535" strokeWidth="3.5" />
    {/* Droopy Right Ear */}
    <path d="M 88 38 C 102 36 102 60 90 62 Z" fill="#FEF08A" stroke="#4A2535" strokeWidth="3.5" />

    {/* Brown Beret */}
    <path d="M 42 26 C 42 16 78 16 78 26 C 78 30 42 30 42 26 Z" fill="#6B4226" stroke="#4A2535" strokeWidth="3" />
    <circle cx="60" cy="16" r="3.5" fill="#6B4226" stroke="#4A2535" strokeWidth="2" />

    {/* Rosy Cheeks */}
    <circle cx="38" cy="56" r="5" fill="#FCA5A5" opacity="0.8" />
    <circle cx="82" cy="56" r="5" fill="#FCA5A5" opacity="0.8" />

    {/* Sleepy curved eyes */}
    <path d="M 44 48 C 47 52 51 52 54 48" stroke="#4A2535" strokeWidth="3" strokeLinecap="round" />
    <path d="M 66 48 C 69 52 73 52 76 48" stroke="#4A2535" strokeWidth="3" strokeLinecap="round" />

    {/* Cute Dark Nose & Tongue */}
    <ellipse cx="60" cy="53" rx="3" ry="2" fill="#4A2535" />
    <path d="M 57 56 C 58 60 62 60 63 56" stroke="#4A2535" strokeWidth="2" />
    <path d="M 58 58 Q 60 62 62 58" fill="#FF6B8B" />
  </svg>
);

// 🐰 Kuromi / Mischievous Bunny (for Whack-A-Bonk)
export const KuromiBunny = ({ className = "w-20 h-20" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Pointy Left Ear */}
    <path d="M 28 45 L 8 10 C 6 6 16 4 24 16 L 36 40 Z" fill="#4A2535" stroke="#2B151F" strokeWidth="2" />
    <circle cx="10" cy="8" r="3.5" fill="#FF8FAB" />
    {/* Pointy Right Ear */}
    <path d="M 72 45 L 92 10 C 94 6 84 4 76 16 L 64 40 Z" fill="#4A2535" stroke="#2B151F" strokeWidth="2" />
    <circle cx="90" cy="8" r="3.5" fill="#FF8FAB" />

    {/* White Head */}
    <ellipse cx="50" cy="55" rx="32" ry="25" fill="#FFFFFF" stroke="#4A2535" strokeWidth="3" />

    {/* Mischievous Eyes */}
    <ellipse cx="38" cy="54" rx="3" ry="5" fill="#4A2535" />
    <ellipse cx="62" cy="54" rx="3" ry="5" fill="#4A2535" />
    <circle cx="37" cy="52" r="1.5" fill="#FFFFFF" />
    <circle cx="61" cy="52" r="1.5" fill="#FFFFFF" />

    {/* Cute Pink Skull on forehead */}
    <g transform="translate(42, 34) scale(0.7)">
      <ellipse cx="12" cy="12" rx="8" ry="7" fill="#FF6B8B" stroke="#4A2535" strokeWidth="1.5" />
      <circle cx="9" cy="11" r="1.5" fill="#4A2535" />
      <circle cx="15" cy="11" r="1.5" fill="#4A2535" />
    </g>

    {/* Cheeky smile */}
    <path d="M 45 64 Q 50 69 55 64" stroke="#4A2535" strokeWidth="2.5" strokeLinecap="round" />
    {/* Pink Cheeks */}
    <circle cx="28" cy="58" r="4" fill="#FF8FAB" opacity="0.7" />
    <circle cx="72" cy="58" r="4" fill="#FF8FAB" opacity="0.7" />
  </svg>
);

// 🍓 Strawberry Icon
export const StrawberryIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 25 12 C 12 12 8 26 12 38 C 16 46 25 48 25 48 C 25 48 34 46 38 38 C 42 26 38 12 25 12 Z" fill="#FF4D6D" stroke="#4A2535" strokeWidth="2.5" />
    {/* Seeds */}
    <circle cx="20" cy="22" r="1.2" fill="#FEF08A" />
    <circle cx="28" cy="24" r="1.2" fill="#FEF08A" />
    <circle cx="18" cy="32" r="1.2" fill="#FEF08A" />
    <circle cx="25" cy="36" r="1.2" fill="#FEF08A" />
    <circle cx="32" cy="32" r="1.2" fill="#FEF08A" />
    {/* Green leafy crown */}
    <path d="M 25 6 L 25 12 M 16 12 C 20 8 25 12 25 12 C 25 12 30 8 34 12 C 28 14 25 12 25 12 C 25 12 22 14 16 12 Z" fill="#86EFAC" stroke="#4A2535" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

// 🥛 Strawberry Milk Carton
export const StrawberryMilkIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 50 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Carton Body */}
    <path d="M 12 22 L 38 22 L 36 54 L 14 54 Z" fill="#FFE4E6" stroke="#4A2535" strokeWidth="2.5" />
    {/* Carton Slanted Top */}
    <path d="M 12 22 L 20 12 L 30 12 L 38 22 Z" fill="#FFD1DC" stroke="#4A2535" strokeWidth="2.5" />
    <path d="M 20 12 L 20 8 L 30 8 L 30 12 Z" fill="#FF8FAB" stroke="#4A2535" strokeWidth="2" />
    {/* Pink Strawberry on carton */}
    <circle cx="25" cy="38" r="6" fill="#FF6B8B" />
    <text x="25" y="30" fontSize="7" fill="#4A2535" fontWeight="bold" textAnchor="middle">MILK</text>
  </svg>
);

// 🧁 Cupcake
export const CupcakeIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Wrapper */}
    <path d="M 14 26 L 18 45 L 32 45 L 36 26 Z" fill="#FDE68A" stroke="#4A2535" strokeWidth="2.5" />
    <line x1="20" y1="26" x2="22" y2="45" stroke="#F59E0B" strokeWidth="1.5" />
    <line x1="26" y1="26" x2="26" y2="45" stroke="#F59E0B" strokeWidth="1.5" />
    <line x1="30" y1="26" x2="28" y2="45" stroke="#F59E0B" strokeWidth="1.5" />
    {/* Swirled Frosting */}
    <path d="M 12 26 C 10 20 20 16 25 18 C 30 14 40 20 38 26 C 36 28 14 28 12 26 Z" fill="#FFB6C6" stroke="#4A2535" strokeWidth="2.5" />
    <circle cx="25" cy="14" r="3.5" fill="#FF3366" stroke="#4A2535" strokeWidth="1.5" />
  </svg>
);

// 🎂 Birthday Cake
export const BirthdayCakeIcon = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Plate */}
    <ellipse cx="30" cy="52" rx="26" ry="6" fill="#FFFFFF" stroke="#4A2535" strokeWidth="2.5" />
    {/* Cake Base */}
    <rect x="12" y="28" width="36" height="22" rx="4" fill="#FFF0F5" stroke="#4A2535" strokeWidth="2.5" />
    {/* Pink Frosting Drips */}
    <path d="M 12 36 Q 18 42 24 36 Q 30 42 36 36 Q 42 42 48 36 L 48 28 L 12 28 Z" fill="#FF8FAB" stroke="#4A2535" strokeWidth="2" />
    {/* Candle */}
    <rect x="28" y="16" width="4" height="12" fill="#89CFF0" stroke="#4A2535" strokeWidth="1.5" />
    {/* Flame */}
    <path d="M 30 8 C 27 12 27 15 30 16 C 33 15 33 12 30 8 Z" fill="#F59E0B" />
    <circle cx="30" cy="13" r="1" fill="#FEF08A" />
  </svg>
);

// 🎁 Pastel Gift Box
export const GiftBoxIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="20" width="30" height="24" rx="3" fill="#BFE3F7" stroke="#4A2535" strokeWidth="2.5" />
    <rect x="8" y="14" width="34" height="8" rx="2" fill="#89CFF0" stroke="#4A2535" strokeWidth="2.5" />
    {/* Ribbon */}
    <rect x="22" y="14" width="6" height="30" fill="#FF8FAB" stroke="#4A2535" strokeWidth="1.5" />
    {/* Bow */}
    <circle cx="21" cy="11" r="3.5" fill="#FF6B8B" stroke="#4A2535" strokeWidth="1.5" />
    <circle cx="29" cy="11" r="3.5" fill="#FF6B8B" stroke="#4A2535" strokeWidth="1.5" />
    <circle cx="25" cy="12" r="2.5" fill="#FFD1DC" />
  </svg>
);

// 🧸 Cute Teddy Bear
export const TeddyBearIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Ears */}
    <circle cx="16" cy="16" r="6" fill="#D4A373" stroke="#4A2535" strokeWidth="2" />
    <circle cx="16" cy="16" r="3" fill="#FFE5D9" />
    <circle cx="34" cy="16" r="6" fill="#D4A373" stroke="#4A2535" strokeWidth="2" />
    <circle cx="34" cy="16" r="3" fill="#FFE5D9" />
    {/* Head */}
    <circle cx="25" cy="24" r="14" fill="#D4A373" stroke="#4A2535" strokeWidth="2.5" />
    {/* Snout */}
    <ellipse cx="25" cy="27" rx="5" ry="3.5" fill="#FFE5D9" stroke="#4A2535" strokeWidth="1.5" />
    <circle cx="25" cy="26" r="1.5" fill="#4A2535" />
    {/* Eyes */}
    <circle cx="20" cy="22" r="1.5" fill="#4A2535" />
    <circle cx="30" cy="22" r="1.5" fill="#4A2535" />
  </svg>
);

// ⏰ Cute Pastel Alarm Clock (obstacle for Catch the Treats)
export const AlarmClockIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bells */}
    <circle cx="14" cy="13" r="5" fill="#9CA3AF" stroke="#4A2535" strokeWidth="2" />
    <circle cx="36" cy="13" r="5" fill="#9CA3AF" stroke="#4A2535" strokeWidth="2" />
    {/* Feet */}
    <line x1="16" y1="41" x2="12" y2="46" stroke="#4A2535" strokeWidth="3" strokeLinecap="round" />
    <line x1="34" y1="41" x2="38" y2="46" stroke="#4A2535" strokeWidth="3" strokeLinecap="round" />
    {/* Clock Face */}
    <circle cx="25" cy="28" r="16" fill="#F3F4F6" stroke="#4A2535" strokeWidth="2.5" />
    {/* Clock Hands */}
    <line x1="25" y1="28" x2="25" y2="18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <line x1="25" y1="28" x2="32" y2="28" stroke="#4A2535" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 🧺 Kawaii Basket (player in Catch the Treats)
export const KawaiiBasket = ({ className = "w-20 h-16" }) => (
  <svg viewBox="0 0 80 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Handle */}
    <path d="M 22 25 C 22 5 58 5 58 25" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
    {/* Basket Weave Body */}
    <path d="M 10 20 L 18 46 C 20 48 60 48 62 46 L 70 20 Z" fill="#FDE68A" stroke="#4A2535" strokeWidth="3" />
    <line x1="15" y1="28" x2="65" y2="28" stroke="#D97706" strokeWidth="2" />
    <line x1="17" y1="36" x2="63" y2="36" stroke="#D97706" strokeWidth="2" />
    {/* Cute Pink Bow on front */}
    <g transform="translate(30, 16) scale(0.35)">
      <ellipse cx="20" cy="20" rx="14" ry="10" transform="rotate(-20 20 20)" fill="#FF6B8B" stroke="#4A2535" strokeWidth="5" />
      <ellipse cx="40" cy="20" rx="14" ry="10" transform="rotate(20 40 20)" fill="#FF6B8B" stroke="#4A2535" strokeWidth="5" />
      <circle cx="30" cy="20" r="8" fill="#FF8FAB" stroke="#4A2535" strokeWidth="5" />
    </g>
  </svg>
);

// 👑 Dress-Up Accessories
export const PartyHatSvg = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="25,6 10,44 40,44" fill="#FF8FAB" stroke="#4A2535" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="25" cy="6" r="4" fill="#FCD34D" stroke="#4A2535" strokeWidth="1.5" />
    <line x1="15" y1="34" x2="35" y2="34" stroke="#89CFF0" strokeWidth="3" />
    <line x1="18" y1="24" x2="32" y2="24" stroke="#FEF08A" strokeWidth="3" />
  </svg>
);

export const PrincessCrownSvg = ({ className = "w-10 h-8" }) => (
  <svg viewBox="0 0 50 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 8 32 L 6 12 L 18 20 L 25 8 L 32 20 L 44 12 L 42 32 Z" fill="#FCD34D" stroke="#4A2535" strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="6" cy="10" r="2.5" fill="#FF6B8B" />
    <circle cx="25" cy="6" r="3" fill="#3B82F6" />
    <circle cx="44" cy="10" r="2.5" fill="#FF6B8B" />
  </svg>
);

export const HeartGlassesSvg = ({ className = "w-12 h-6" }) => (
  <svg viewBox="0 0 60 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Heart Glass */}
    <path d="M 18 10 C 13 4 5 10 9 17 C 13 24 18 26 18 26 C 18 26 23 24 27 17 C 31 10 23 4 18 10 Z" fill="#FF4D6D" stroke="#4A2535" strokeWidth="2" opacity="0.85" />
    {/* Bridge */}
    <line x1="26" y1="14" x2="34" y2="14" stroke="#4A2535" strokeWidth="2.5" />
    {/* Right Heart Glass */}
    <path d="M 42 10 C 37 4 29 10 33 17 C 37 24 42 26 42 26 C 42 26 47 24 51 17 C 55 10 47 4 42 10 Z" fill="#FF4D6D" stroke="#4A2535" strokeWidth="2" opacity="0.85" />
  </svg>
);

// 🎨 Memory Card Fallback Kawaii Illustration
export const MemoryFallbackCard = ({ index = 0, title = "Special Memory" }) => {
  const backgrounds = [
    { bg: "from-pink-100 to-rose-200", badge: "☕ Cafe Date" },
    { bg: "from-blue-100 to-pink-100", badge: "🌅 Golden Hour" },
    { bg: "from-amber-100 to-pink-100", badge: "🧋 Sweet Treat" },
    { bg: "from-purple-100 to-pink-100", badge: "☁️ Cozy Snuggles" },
    { bg: "from-rose-100 to-yellow-100", badge: "🍓 Big Smile" },
    { bg: "from-pink-200 to-sky-100", badge: "🎂 Birthday Wish" },
  ];
  const current = backgrounds[index % backgrounds.length];

  return (
    <div className={`w-full h-56 rounded-2xl bg-gradient-to-br ${current.bg} flex flex-col items-center justify-center p-4 border-2 border-white shadow-inner relative overflow-hidden group`}>
      {/* Decorative floating dots/sparkles */}
      <div className="absolute top-2 left-3 text-pink-400 text-xs animate-pulse">✦</div>
      <div className="absolute bottom-3 right-3 text-pink-400 text-xs animate-bounce">🎀</div>
      <div className="absolute top-3 right-4 text-amber-400 text-xs">✨</div>
      
      {/* Mascot illustration */}
      <div className="transform transition-transform duration-300 group-hover:scale-110">
        {index % 3 === 0 && <HelloKittyFace className="w-24 h-20 drop-shadow-md" />}
        {index % 3 === 1 && <CinnabunPet className="w-28 h-20 drop-shadow-md" />}
        {index % 3 === 2 && <PuddingPet className="w-28 h-20 drop-shadow-md" />}
      </div>

      <span className="mt-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[#4A2535] border border-pink-200 shadow-sm">
        {current.badge}
      </span>
      <p className="text-[11px] text-[#7A4B60] mt-1 font-semibold">Drop photo in config to replace 📸</p>
    </div>
  );
};
