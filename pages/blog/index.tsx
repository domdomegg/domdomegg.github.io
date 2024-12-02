import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Blog, BlogPosting, WithContext } from 'schema-dts';
import ProsePage from '../../components/ProsePage';
import SiteHeader from '../../components/SiteHeader';
import { Post } from '../../components/BlogHeader';
import { getSortedPostsData, writeRssFeed } from '../../lib/blog';

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
