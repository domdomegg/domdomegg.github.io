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
      <h1 className="!mb-8" id="blog-headline" itemProp="headline">{title}</h1>
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
        <div className="flex-1">
          <div className="flex flex-row gap-2 relative w-full" itemProp="author" itemScope itemType="https://schema.org/Person">
            <p className="!my-0 leading-none" itemProp="name"><a href="/" itemProp="url">Adam Jones</a></p>
            <button type="button" className="cursor-auto p-4 -my-6 -mx-4">
              <span className="bg-gray-300 rounded-full text-sm px-2">Personally</span>
            </button>
            <span className="absolute block mt-6 bg-white border w-full border-gray-300 rounded shadow px-3 text-xs z-10 transition-all origin-top-left invisible scale-0 [button:hover_+_&]:visible [button:focus-within_+_&]:visible hover:visible focus-within:visible [button:hover_+_&]:scale-100 [button:focus-within_+_&]:scale-100 hover:scale-100 focus-within:scale-100">
              <p>
                This is my personal blog, where I write solely in my personal capacity. It does not represent the positions of any organisations I'm associated with.
              </p>
              <p>
                Also, everything here is provded "as is", without warranties of any kind, express or implied.
              </p>
            </span>
          </div>
          <p className="!mb-0 !mt-1 leading-none text-xs text-gray-500">
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
    </>
  );
};

export default BlogHeader;
