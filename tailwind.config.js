const defaultTheme = require('tailwindcss/defaultTheme');
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './next.config.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'fade-up': {
          // This ensures things are in the right place to start, so fragment links etc. take people to the right place
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '1%': { opacity: '0', transform: 'translateY(1rem)' },
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
      typography: {
        DEFAULT: {
          css: {
            // Disable adding quote marks to block-quotes
            // https://github.com/tailwindlabs/tailwindcss-typography/issues/66#issuecomment-1754429609
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,

            // Disable adding backticks to code
            'code::before': false,
            'code::after': false,
          },
        },
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
