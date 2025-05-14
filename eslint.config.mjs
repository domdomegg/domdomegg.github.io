import domdomegg from 'eslint-config-domdomegg';
import * as mdx from 'eslint-plugin-mdx';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
	{
		ignores: ['.next', 'next-env.d.ts'],
	},
	...domdomegg,
	{
		...mdx.flat,
		rules: {
			'@stylistic/indent': 'off',
			'@stylistic/no-multi-spaces': 'off',
			'@stylistic/semi': 'off',
			'no-unused-expressions': 'off',
			'no-undef': 'off',
		},
	},
	{
		...mdx.flatCodeBlocks,
	},
];
