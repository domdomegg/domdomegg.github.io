/* eslint-disable global-require */
module.exports = async () => {
  const nextMDX = require('@next/mdx');
  const recmaMdxDisplayname = require('recma-mdx-displayname');
  const recmaNextjsStaticProps = (await import('recma-nextjs-static-props')).default;
  const remarkMdxFrontmatter = (await import('remark-mdx-frontmatter')).default;
  const remarkFrontmatter = (await import('remark-frontmatter')).default;
  const remarkGfm = (await import('remark-gfm')).default;

  const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
      recmaPlugins: [recmaMdxDisplayname, recmaNextjsStaticProps],
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    },
  });

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    output: 'export',
    distDir: 'dist',
    reactStrictMode: true,
    images: {
      unoptimized: true,
    },
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    trailingSlash: true,
  };

  return withMDX(nextConfig);
};
