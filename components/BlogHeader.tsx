import Image from 'next/image';
import z from 'zod';
import clsx from 'clsx';
import Head from 'next/head';
import { BlogPosting, WithContext } from 'schema-dts';

export const frontmatterSchema = z.object({
  title: z.string(),
  publishedOn: z.string().date(),
  updatedOn: z.string().date().optional(),
});

export const postSchema = frontmatterSchema.extend({
  href: z.string(),
  absoluteUrl: z.string(),
  location: z.literal('internal').or(z.literal('external')),
});

export type Post = Zod.infer<typeof postSchema>;

const BlogHeader: React.FC<{ frontmatter: unknown }> = ({ frontmatter }) => {
  const parsed = frontmatterSchema.parse(frontmatter);
  const { publishedOn, updatedOn, title } = parsed;

  const jsonLd: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',

    name: parsed.title,
    headline: parsed.title,
    datePublished: new Date(parsed.publishedOn).toISOString(),
    dateModified: parsed.updatedOn ? new Date(parsed.updatedOn).toISOString() : undefined,

    author: {
      '@type': 'Person',
      '@id': 'https://adamjones.me/',
      url: 'https://adamjones.me/',
      name: 'Adam Jones',
    },
  };

  return (
    <>
      <Head>
        <title>{`${title} - Adam Jones's Blog`}</title>
        <link rel="alternate" type="application/rss+xml" title="RSS" href="../feed" />
      </Head>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="!mb-8" id="blog-headline">{title}</h1>
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
          <div className="flex flex-row gap-2 relative w-full">
            <p className="!my-0 leading-none"><a href="/">Adam Jones</a></p>
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
            {updatedOn ? 'Published ' : ''}
            <time dateTime={new Date(publishedOn).toISOString()}>
              {new Date(publishedOn).toLocaleDateString('en-GB', { dateStyle: 'long' })}
            </time>
            {updatedOn ? ' · Updated ' : ''}
            <time dateTime={new Date(updatedOn ?? publishedOn).toISOString()} className={clsx({ hidden: !parsed.updatedOn })}>
              {new Date(updatedOn ?? publishedOn).toLocaleDateString('en-GB', { dateStyle: 'long' })}
            </time>
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogHeader;
