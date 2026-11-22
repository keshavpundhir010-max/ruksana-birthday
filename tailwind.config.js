/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFD1DC',
          pinkLight: '#FFF0F5',
          pinkHover: '#FFB6C6',
          pinkDeep: '#FF8FAB',
          pinkVibrant: '#FF6B8B',
          snow: '#FFF9FA',
          pureWhite: '#FFFFFF',
          blueLight: '#E8F4FC',
          blue: '#BFE3F7',
          blueAccent: '#89CFF0',
          yellowSoft: '#FEF3BD',
          yellowWarm: '#FDE68A',
          berry: '#4A2535',
          berryMuted: '#7A4B60',
          berryLight: '#A36B82',
        }
      },
      fontFamily: {
        kawaii: ['"Fredoka"', '"Nunito"', '"M PLUS Rounded 1c"', 'ui-rounded', 'sans-serif'],
        cursive: ['"Gaegu"', '"Dancing Script"', 'cursive']
      },
      boxShadow: {
        'kawaii': '0 8px 25px -4px rgba(255, 142, 171, 0.35)',
        'kawaii-lg': '0 15px 35px -5px rgba(255, 142, 171, 0.45), 0 0 0 3px rgba(255, 209, 220, 0.5)',
        'kawaii-glow': '0 0 20px rgba(255, 158, 181, 0.6)',
        'kawaii-card': '0 10px 30px -5px rgba(74, 37, 53, 0.08), 0 0 0 2px rgba(255, 209, 220, 0.6)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounceCute: {
          '0%, 100%': { transform: 'translateY(0) scale(1, 1)' },
          '50%': { transform: 'translateY(-16px) scale(1.05, 0.95)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.4) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.2) rotate(180deg)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
        bounceCute: 'bounceCute 1.2s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
