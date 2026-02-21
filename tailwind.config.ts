import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f7',
          100: '#ffe4ea',
          200: '#ffc9d5',
          300: '#ffa0b4',
          400: '#ff6b8a',
          500: '#f93e65',
          600: '#e71d47',
          700: '#c3103a',
          800: '#a31036',
          900: '#8b1132',
        },
        nude: {
          50: '#fdf8f5',
          100: '#f9ede4',
          200: '#f2d9c9',
          300: '#e8bfa5',
          400: '#d99f7d',
          500: '#cc835a',
          600: '#be6d45',
          700: '#9e5939',
          800: '#804a32',
          900: '#6a3e2b',
        },
        champagne: '#f7e7c1',
        gold: '#c9a84c',
        'gold-light': '#e8d5a0',
        cream: '#fef9f5',
        'rose-gold': '#b76e79',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #fff5f7 0%, #fdf8f5 40%, #f9ede4 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
