import type {Config} from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
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
				'wave-in': {
					'0%': {transform: 'rotate(70deg)'},
					'40%': {transform: 'rotate(-30deg)'},
					'70%': {transform: 'rotate(20deg)'},
					'90%': {transform: 'rotate(-10deg)'},
				},
			},
			animation: {
				'wave-in': '0.7s cubic-bezier(0.5, 1, 0.89, 1) 0s 1 both running wave-in',
			},
		},
	},
};

export default config;
