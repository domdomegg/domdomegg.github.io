/* eslint-disable global-require */
module.exports = async () => {
  const nextMDX = require('@next/mdx');
  const recmaMdxDisplayname = require('recma-mdx-displayname');
  const recmaMdxFrontmatter = require('recma-mdx-frontmatter');
  const remarkFrontmatter = (await import('remark-frontmatter')).default;
  const remarkGfm = (await import('remark-gfm')).default;
  const rehypeSlug = (await import('rehype-slug')).default;

  const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
      recmaPlugins: [recmaMdxDisplayname, recmaMdxFrontmatter],
      remarkPlugins: [remarkFrontmatter, remarkGfm],
      rehypePlugins: [rehypeSlug],
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
