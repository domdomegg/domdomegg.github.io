import Image from 'next/image';
import z from 'zod';
import clsx from 'clsx';
import Head from 'next/head';

export const frontmatterSchema = z.object({
  title: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
});

const BlogHeader: React.FC<{ frontmatter: unknown }> = ({ frontmatter }) => {
  const parsed = frontmatterSchema.parse(frontmatter);
  const { publishedAt, updatedAt, title } = parsed;

  return (
    <>
      <Head>
        <title>{`${title} - Adam Jones's Blog`}</title>
        <link rel="alternate" type="application/rss+xml" title="RSS" href="../feed" />
      </Head>
      <h1 className="!mb-6" itemProp="headline">{title}</h1>
      <div className="flex gap-2 items-center mb-10">
        <a href="/">
          <Image
            className="rounded-full !my-0"
            src="/images/profile-pic.webp"
            alt="Headshot of Adam Jones"
            width={40}
            height={40}
            priority
          />
        </a>
        <div>
          <div itemProp="author" itemScope itemType="https://schema.org/Person">
            <p className="!my-2 !leading-none" itemProp="name"><a href="/" itemProp="url">Adam Jones</a></p>
          </div>
          <p className="!my-2 !leading-none text-xs text-gray-500">
            {updatedAt ? 'Published ' : ''}
            <time itemProp="datePublished" dateTime={new Date(publishedAt).toISOString()}>
              {new Date(publishedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}
            </time>
            {updatedAt ? ' · Updated ' : ''}
            <time itemProp="dateModified" dateTime={new Date(updatedAt ?? publishedAt).toISOString()} className={clsx({ hidden: !parsed.updatedAt })}>
              {new Date(updatedAt ?? publishedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}
            </time>
          </p>
        </div>
      </div>
      <p><em>This article is written solely in my personal capacity, and does not represent the views of any organisations I am affiliated with.</em></p>
    </>
  );
};

export default BlogHeader;
