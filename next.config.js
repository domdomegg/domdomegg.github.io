const recmaMdxDisplayname = require('recma-mdx-displayname');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    recmaPlugins: [recmaMdxDisplayname],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

module.exports = withMDX(nextConfig);
