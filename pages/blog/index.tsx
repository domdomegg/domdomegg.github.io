import { GetStaticProps } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import Head from 'next/head';
import { Feed } from 'feed';
import ProsePage from '../../components/ProsePage';
import SiteHeader from '../../components/SiteHeader';
import { Post, postSchema } from '../../components/BlogHeader';

const externalPosts: Post[] = [
  {
    title: 'Why we work in public at BlueDot Impact',
    href: 'https://bluedot.org/blog/working-in-public/',
    publishedOn: '2024-06-16',
  },
  {
    title: 'Why are people building AI systems?',
    href: 'https://aisafetyfundamentals.com/blog/why-are-people-building-ai-systems/',
    publishedOn: '2024-05-25',
  },
  {
    title: 'AI alignment project ideas',
    href: 'https://aisafetyfundamentals.com/blog/alignment-project-ideas/',
    publishedOn: '2024-04-12',
  },
  {
    title: 'How to avoid the 4 mistakes behind 92% of rejected AI governance applications',
    href: 'https://aisafetyfundamentals.com/blog/avoid-governance-application-mistakes/',
    publishedOn: '2024-04-05',
  },
  {
    title: 'Can we scale human feedback for complex AI tasks? An intro to scalable oversight.',
    href: 'https://aisafetyfundamentals.com/blog/scalable-oversight-intro/',
    publishedOn: '2024-03-18',
  },
  {
    title: 'What is AI alignment?',
    href: 'https://aisafetyfundamentals.com/blog/what-is-ai-alignment/',
    publishedOn: '2024-03-01',
  },
  {
    title: 'What risks does AI pose?',
    href: 'https://aisafetyfundamentals.com/blog/ai-risks/',
    publishedOn: '2024-02-21',
  },
].map((p) => ({ ...p, location: 'external' }));

interface BlogIndexProps {
  posts: Post[]
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
            {post.location === 'external' && <>{' '}<span className="bg-gray-300 rounded-full text-xs px-2">External</span></>}
            <span className="text-xs text-gray-500">
              {' '}
              —
              {' '}
              <time dateTime={new Date(post.publishedOn).toISOString()}>
                {new Date(post.publishedOn).toLocaleDateString('en-GB', { dateStyle: 'long' })}
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

function getSortedPostsData(): Post[] {
  const blogDir = path.join(process.cwd(), 'pages', 'blog');
  const fileNames = fs.readdirSync(blogDir).filter((f) => f !== 'index.tsx' && !f.startsWith('_'));
  const localPostsData = fileNames.map((fileName) => {
    const fileContents = fs.readFileSync(path.join(blogDir, fileName), 'utf8');
    const href = `./${fileName.slice(0, fileName.lastIndexOf('.'))}`;
    const matterData = matter(fileContents).data;
    return {
      ...matterData,
      href,
      location: 'internal',
    };
  });

  return [...localPostsData, ...externalPosts]
    .map((p) => postSchema.parse(p, { path: [p.href] }))
    .sort((a, b) => {
      if (a.publishedOn < b.publishedOn) {
        return 1;
      }
      return -1;
    });
}

function writeRssFeed(posts: Post[]) {
  const feed = new Feed({
    id: 'https://adamjones.me/',
    link: 'https://adamjones.me/',
    generator: 'https://adamjones.me/',
    title: 'Adam Jones\'s Blog',
    description: 'Adam Jones\'s Blog',
    language: 'en',
    favicon: 'https://adamjones.me/favicon.ico',
    copyright: '',
    feed: 'https://adamjones.me/blog/feed',
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      link: post.location === 'internal' ? `https://adamjones.me/blog/${post.href.slice(1)}` : post.href,
      date: new Date(post.publishedOn),
    });
  });

  const rss = feed.rss2();
  fs.mkdirSync('public/blog', { recursive: true });
  fs.writeFileSync('public/blog/feed', rss);
}
