import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Feed } from 'feed';
import { Post, postSchema } from '../components/BlogHeader';

const externalPosts: Post[] = ([
  {
    title: 'Why we run our AI safety courses',
    href: 'https://aisafetyfundamentals.com/blog/why-we-run-our-ai-safety-courses/',
    publishedOn: '2024-12-04',
  },
  {
    title: 'How Does AI Learn? A Beginner’s Guide with Examples',
    href: 'https://aisafetyfundamentals.com/blog/how-does-ai-learn/',
    publishedOn: '2024-11-29',
  },
  {
    title: 'AI Alignment June 2024 course retrospective',
    href: 'https://bluedot.org/blog/ai-alignment-june-2024-retro/',
    publishedOn: '2024-10-30',
  },
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

export function getSortedPostsData(): Post[] {
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

export function getRecentPost(): Post | undefined {
  const posts = getSortedPostsData();

  return posts.find((p) => {
    const publishedDate = new Date(p.publishedOn);
    const now = new Date();
    const daysSincePublished = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24));

    return daysSincePublished <= 14 && daysSincePublished >= 0;
  });
}

export function writeRssFeed(posts: Post[]) {
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
