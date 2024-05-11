import { GetStaticProps } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import z from 'zod';
import Head from 'next/head';
import { Feed } from 'feed';
import { frontmatterSchema } from '../../components/BlogHeader';
import ProsePage from '../../components/ProsePage';
import SiteHeader from '../../components/SiteHeader';

const postSchema = frontmatterSchema.extend({
  href: z.string(),
});

interface BlogIndexProps {
  posts: Zod.infer<typeof postSchema>[]
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  return (
    <ProsePage>
      <SiteHeader />
      <Head>
        <title>Adam Jones's Blog</title>
        <link rel="alternate" type="application/rss+xml" title="RSS" href="./feed" />
      </Head>
      <h1>Adam Jones's Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.href}>
            <a href={post.href}>{post.title}</a>
            <span className="text-xs text-gray-500">
              {' '}
              —
              {' '}
              <time dateTime={new Date(post.publishedAt).toISOString()}>
                {new Date(post.publishedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}
              </time>
            </span>
          </li>
        ))}
      </ul>
    </ProsePage>
  );
};

export default BlogIndex;

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const posts = getSortedPostsData();
  writeRssFeed(posts);

  return {
    props: {
      posts,
    },
  };
};

function getSortedPostsData() {
  const blogDir = path.join(process.cwd(), 'pages', 'blog');
  const fileNames = fs.readdirSync(blogDir).filter((f) => f !== 'index.tsx');
  const allPostsData = fileNames.map((fileName) => {
    const fileContents = fs.readFileSync(path.join(blogDir, fileName), 'utf8');
    const href = `./${fileName.slice(0, fileName.lastIndexOf('.'))}`;
    const matterData = matter(fileContents).data;
    return postSchema.parse({
      ...matterData,
      href,
    });
  });

  return allPostsData.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1;
    }
    return -1;
  });
}

function writeRssFeed(posts: Zod.infer<typeof postSchema>[]) {
  const feed = new Feed({
    id: 'https://adamjones.me/',
    link: 'https://adamjones.me/',
    generator: 'https://adamjones.me/',
    title: 'Adam Jones\'s Blog',
    description: 'Adam Jones\'s Blog',
    language: 'en',
    favicon: 'https://adamjones.me/favicon.ico',
    copyright: '',
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      link: `https://adamjones.me/blog/${post.href.slice(1)}`,
      date: new Date(post.publishedAt),
    });
  });

  const rss = feed.rss2();
  fs.mkdirSync('public/blog', { recursive: true });
  fs.writeFileSync('public/blog/feed', rss);
}
