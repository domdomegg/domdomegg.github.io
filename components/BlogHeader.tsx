import Image from 'next/image';
import z from 'zod';
import clsx from 'clsx';
import Head from 'next/head';

export const frontmatterSchema = z.object({
  title: z.string(),
  publishedAt: z.string(),
  modifiedAt: z.string().optional(),
});

const BlogHeader: React.FC<{ frontmatter: unknown }> = ({ frontmatter }) => {
  const parsed = frontmatterSchema.parse(frontmatter);
  const { publishedAt, modifiedAt, title } = parsed;

  return (
    <>
      <Head>
        <title>{title} - Adam Jones's Blog</title>
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
        <div itemProp="author" itemScope itemType="https://schema.org/Person">
          <p className="!my-2 !leading-none" itemProp="name"><a href="/" itemProp="url">Adam Jones</a></p>
          <p className="!my-2 !leading-none text-xs text-gray-500">
            {modifiedAt ? 'Published ' : ''}
            <time itemProp="datePublished" dateTime={new Date(publishedAt).toISOString()}>
              {new Date(publishedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}
            </time>
            {modifiedAt ? ' · Updated ' : ''}
            <time itemProp="dateModified" dateTime={new Date(modifiedAt ?? publishedAt).toISOString()} className={clsx({ hidden: !parsed.modifiedAt })}>
              {new Date(modifiedAt ?? publishedAt).toLocaleDateString('en-GB', { dateStyle: 'long' })}
            </time>
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogHeader;
