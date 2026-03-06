/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0a',
          800: '#0f0f0f',
          700: '#141414',
          600: '#1a1a1a',
          500: '#222222',
          400: '#2a2a2a',
        },
        red: {
          400: '#ff4d4d',
          500: '#ef4444',
          600: '#dc2626',
        },
        green: {
          400: '#4ade80',
          500: '#22c55e',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
        sans: ['Rajdhani', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 5px #ef4444, 0 0 10px #ef4444' },
          'to': { boxShadow: '0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #ef4444' },
        },
        slideIn: {
          'from': { transform: 'translateX(-20px)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
