import type {NextConfig} from 'next';
import nextMDX from '@next/mdx';
import path from 'node:path';

// Turbopack serializes loader options, so plugins must be referenced as
// resolvable strings rather than function references. The mdx-js-loader
// handles require.resolve + dynamic import at runtime.
const projectRoot = process.cwd();

const withMDX = nextMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [
			'remark-frontmatter',
			'remark-gfm',
		],
		rehypePlugins: [
			'rehype-slug',
			'@stefanprobst/rehype-extract-toc',
			'@stefanprobst/rehype-extract-toc/mdx',
			path.join(projectRoot, 'lib/rehype-hoverable-footnotes.mjs'),
		],
		recmaPlugins: [
			'recma-mdx-displayname',
			'recma-mdx-frontmatter',
			path.join(projectRoot, 'lib/recma-href.mjs'),
			'recma-nextjs-static-props',
		],
	},
});

const nextConfig: NextConfig = {
	output: 'export',
	// Dev gets its own output dir (and thus its own Turbopack cache) so that
	// running `next build` alongside the dev server can't corrupt the dev
	// server's compiled output. See https://github.com/domdomegg/domdomegg.github.io/issues/54
	distDir: process.env.NODE_ENV === 'development' ? 'dist-dev' : 'dist',
	reactStrictMode: true,
	images: {
		unoptimized: true,
	},
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	trailingSlash: true,
	devIndicators: false,
};

export default withMDX(nextConfig);
