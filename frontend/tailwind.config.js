/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#05070d',
          surface: '#0c111d',
          surfaceHover: '#131b2e',
          card: 'rgba(12, 17, 29, 0.75)',
          border: 'rgba(0, 240, 255, 0.15)',
          borderHover: 'rgba(0, 240, 255, 0.4)',
          cyan: '#00f0ff',
          cyanDim: 'rgba(0, 240, 255, 0.12)',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          purpleDim: 'rgba(139, 92, 246, 0.15)',
          neonGreen: '#00ff88',
          neonRed: '#ff3366',
          textMuted: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan-sm': '0 0 15px rgba(0, 240, 255, 0.25)',
        'glow-cyan': '0 0 30px rgba(0, 240, 255, 0.35)',
        'glow-cyan-lg': '0 0 50px rgba(0, 240, 255, 0.45)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.35)',
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.35)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spin-reverse': 'spin 25s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
