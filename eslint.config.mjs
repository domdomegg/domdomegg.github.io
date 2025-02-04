import domdomegg from 'eslint-config-domdomegg';
import eslintMdx from 'eslint-mdx';
import mdx from 'eslint-plugin-mdx';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
	{
		ignores: ['.next', 'next-env.d.ts'],
	},
	...domdomegg,
	{
		files: ['**/*.mdx'],
		languageOptions: {
			sourceType: 'module',
			ecmaVersion: 'latest',
			parser: eslintMdx,
		},
		plugins: {
			mdx,
		},
		rules: {
			'@stylistic/indent': 'off',
			'@stylistic/no-multi-spaces': 'off',
			'@stylistic/semi': 'off',
			'no-unused-expressions': 'off',
			'no-undef': 'off',
		},
	},
];
