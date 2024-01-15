import { GetStaticProps } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import z from 'zod';
import { frontmatterSchema } from '../../components/BlogHeader';
import ProsePage from '../../components/ProsePage';

const postSchema = frontmatterSchema.extend({
  href: z.string(),
});

interface BlogIndexProps {
  posts: Zod.infer<typeof postSchema>[]
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  return (
    <ProsePage>
      <h1>Adam's Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.href}>
            <a href={post.href}>{post.title}</a>
            <span className="text-xs text-gray-500">
              {' '}
              —
              {' '}
              <time dateTime={new Date(post.publishedAt).toISOString()}>
                {new Date(post.publishedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
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
  return {
    props: {
      posts: getSortedPostsData(),
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
