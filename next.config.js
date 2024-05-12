/* eslint-disable global-require */
module.exports = async () => {
  const nextMDX = require('@next/mdx');

  const remarkFrontmatter = (await import('remark-frontmatter')).default;
  const remarkGfm = (await import('remark-gfm')).default;

  const rehypeSlug = (await import('rehype-slug')).default;
  const rehypeExtractToc = (await import('@stefanprobst/rehype-extract-toc')).default;
  const rehypeExtractTocExport = (await import('@stefanprobst/rehype-extract-toc/mdx')).default;

  const recmaMdxDisplayname = require('recma-mdx-displayname');
  const recmaMdxFrontmatter = require('recma-mdx-frontmatter');
  const recmaNextjsStaticProps = (await import('recma-nextjs-static-props')).default;

  const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [remarkFrontmatter, remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeExtractToc, rehypeExtractTocExport],
      recmaPlugins: [recmaMdxDisplayname, recmaMdxFrontmatter, recmaNextjsStaticProps],
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
