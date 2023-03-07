const defaultTheme = require('tailwindcss/defaultTheme');
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(1rem)' },
        },
        'wave-in': {
          '0%': { transform: 'rotate(70deg)' },
          '40%': { transform: 'rotate(-30deg)' },
          '70%': { transform: 'rotate(20deg)' },
          '90%': { transform: 'rotate(-10deg)' },
        },
      },
      animation: {
        'fade-up': '0.4s ease-in-out 0s 1 both running fade-up',
        'wave-in': '0.7s cubic-bezier(0.5, 1, 0.89, 1) 0s 1 both running wave-in',
      },
    },
  },
  plugins: [
    typography({
      // https://github.com/tailwindlabs/tailwindcss/discussions/7684
      // https://bugs.chromium.org/p/chromium/issues/detail?id=1407172
      target: 'legacy',
    }),
  ],
};
