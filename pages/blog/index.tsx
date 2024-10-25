import { GetStaticProps } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import Head from 'next/head';
import { Feed } from 'feed';
import { Blog, BlogPosting, WithContext } from 'schema-dts';
import ProsePage from '../../components/ProsePage';
import SiteHeader from '../../components/SiteHeader';
import { Post, postSchema } from '../../components/BlogHeader';

const externalPosts: Post[] = ([
  {
    title: 'Does project proposal feedback result in better final projects?',
    href: 'https://bluedot.org/blog/is-proposal-feedback-helpful/',
    publishedOn: '2024-10-21',
  },
  {
    title: 'Modular AI Safety courses proposal',
    href: 'https://bluedot.org/blog/modular-ai-safety-courses-proposal/',
    publishedOn: '2024-09-16',
  },
  {
    title: 'Summary of AI alignment participant user interviews',
    href: 'https://bluedot.org/blog/alignment-participant-user-interviews/',
    publishedOn: '2024-09-13',
  },
  {
    title: 'What we didn’t cover in our June 2024 AI Alignment course (or, an accessible list of more niche alignment research agendas)',
    href: 'https://aisafetyfundamentals.com/blog/not-covered-2406-alignment/',
    publishedOn: '2024-08-13',
  },
  {
    title: 'Results from testing ad adjustments',
    href: 'https://bluedot.org/blog/ads-alignment-june24-tests/',
    publishedOn: '2024-08-07',
  },
  {
    title: 'What advertising creatives work for technical people?',
    href: 'https://bluedot.org/blog/ads-alignment-june24-creatives/',
    publishedOn: '2024-08-07',
  },
  {
    title: 'Advertising to technical people: LinkedIn, Twitter, Reddit and others compared',
    href: 'https://bluedot.org/blog/ads-alignment-june24-platforms/',
    publishedOn: '2024-08-07',
  },
  {
    title: 'How to avoid the 2 mistakes behind 89% of rejected AI alignment applications',
    href: 'https://aisafetyfundamentals.com/blog/avoid-alignment-application-mistakes/',
    publishedOn: '2024-07-22',
  },
  {
    title: 'What do applicants mean when they say they come from LinkedIn?',
    href: 'https://bluedot.org/blog/generic-linkedin-source-attribution/',
    publishedOn: '2024-07-19',
  },
  {
    title: 'Our 2023 internal cybersecurity course',
    href: 'https://bluedot.org/blog/internal-cybersecurity-2023/',
    publishedOn: '2024-07-15',
  },
  {
    title: 'What we learnt from running our AI alignment course in March 2024',
    href: 'https://bluedot.org/blog/ai-alignment-march-2024-retro/',
    publishedOn: '2024-07-02',
  },
  {
    title: 'What is a lead cohort?',
    href: 'https://bluedot.org/blog/lead-cohort/',
    publishedOn: '2024-07-01',
  },
  {
    title: 'What we changed for the June 2024 AI alignment course',
    href: 'https://aisafetyfundamentals.com/blog/june-2024-alignment-course-updates/',
    publishedOn: '2024-06-24',
  },
  {
    title: '3 articles on AI safety we’d like to exist',
    href: 'https://aisafetyfundamentals.com/blog/ai-safety-articles-we-would-like-to-exist/',
    publishedOn: '2024-06-17',
  },
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
] satisfies Omit<Post, 'absoluteUrl' | 'location'>[])
  .map((p) => ({ ...p, absoluteUrl: p.href, location: 'external' }));

interface BlogIndexProps {
  posts: Post[]
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  const jsonLd: WithContext<Blog> = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://adamjones.me/blog/',
    mainEntityOfPage: 'https://adamjones.me/blog/',
    url: 'https://adamjones.me/blog/',

    name: 'Adam Jones\'s Blog',
    author: {
      '@type': 'Person',
      '@id': 'https://adamjones.me/',
      url: 'https://adamjones.me/',
      name: 'Adam Jones',
    },
    blogPost: posts.map<BlogPosting>((p) => ({
      '@type': 'BlogPosting',
      '@id': p.absoluteUrl,
      mainEntityOfPage: p.absoluteUrl,
      url: p.absoluteUrl,

      name: p.title,
      headline: p.title,
      datePublished: new Date(p.publishedOn).toISOString(),
      dateModified: p.updatedOn ? new Date(p.updatedOn).toISOString() : undefined,

      author: {
        '@type': 'Person',
        '@id': 'https://adamjones.me/',
        url: 'https://adamjones.me/',
        name: 'Adam Jones',
      },
    })),
  };

  return (
    <ProsePage>
      <SiteHeader />
      <Head>
        <title>Adam Jones's Blog</title>
        <link rel="alternate" type="application/rss+xml" title="RSS" href="./feed" />
      </Head>
      <h1>Adam Jones's Blog</h1>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    const href = `./${fileName.slice(0, fileName.lastIndexOf('.'))}/`;
    const matterData = matter(fileContents).data;
    return {
      ...matterData,
      href,
      absoluteUrl: `https://adamjones.me/blog/${href.slice(2)}`,
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
      link: post.absoluteUrl,
      date: new Date(post.publishedOn),
    });
  });

  const rss = feed.rss2();
  fs.mkdirSync('public/blog', { recursive: true });
  fs.writeFileSync('public/blog/feed', rss);
}
