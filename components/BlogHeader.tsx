import Image from 'next/image';
import z from 'zod';
import clsx from 'clsx';
import Head from 'next/head';
import {type BlogPosting, type WithContext} from 'schema-dts';
import Link from 'next/link';

export const frontmatterSchema = z.object({
	title: z.string(),
	publishedOn: z.string().date(),
	updatedOn: z.string().date().optional(),
	citable: z.boolean().optional(),
});

export const postSchema = frontmatterSchema.extend({
	href: z.string(),
	absoluteUrl: z.string(),
	location: z.literal('internal').or(z.literal('external')),
});

export type Post = Zod.infer<typeof postSchema>;

const BlogHeader: React.FC<{frontmatter: unknown; href: string}> = ({frontmatter, href}) => {
	const parsed = frontmatterSchema.parse(frontmatter);

	// Date in format YYYY/MM/DD
	const citationDate = new Date(parsed.publishedOn).toISOString().slice(0, 10).replaceAll('-', '/');

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
				<title>{`${parsed.title} - Adam Jones's Blog`}</title>
				<link rel='alternate' type='application/rss+xml' title='RSS' href='../feed' />
				{parsed.citable && (
					<>
						<meta name='citation_title' content={parsed.title} />
						<meta name='citation_author' content='Adam Jones' />
						<meta name='citation_date' content={citationDate} />
						<meta name='citation_online_date' content={citationDate} />
						<meta name='citation_publication_date' content={citationDate} />
						<meta name='citation_fulltext_html_url' content={`https://adamjones.me${href}`} />
						<meta name='citation_fulltext_world_readable' content='' />
					</>
				)}
			</Head>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
			/>
			<h1 className='!mb-8' id='blog-headline'>{parsed.title}</h1>
			<div className='flex gap-2 items-center mb-10'>
				<Link href='/'>
					<Image
						className='rounded-full !my-0'
						src='/images/adam-jones.jpg'
						alt='Headshot of Adam Jones'
						width={40}
						height={40}
						priority
					/>
				</Link>
				<div className='flex-1'>
					<div className='flex flex-row gap-2 relative w-full'>
						<p className='!my-0 leading-none'><Link href='/'>Adam Jones</Link></p>
						<button type='button' className='cursor-auto p-4 -my-6 -mx-4'>
							<span className='bg-stone-300 dark:bg-stone-800 rounded-full text-sm px-2'>Personally</span>
						</button>
						<span className='absolute block mt-6 bg-white dark:bg-stone-800 border w-full border-stone-300 dark:border-stone-600 rounded-sm shadow-sm px-3 text-xs z-10 transition-all origin-top-left invisible scale-0 [button:hover_+_&]:visible [button:focus-within_+_&]:visible hover:visible focus-within:visible [button:hover_+_&]:scale-100 [button:focus-within_+_&]:scale-100 hover:scale-100 focus-within:scale-100'>
							<p>
								This is my personal blog, where I write solely in my personal capacity. It does not represent the positions of any organisations I'm associated with.
							</p>
							<p>
								Also, everything here is provded "as is", without warranties of any kind, express or implied.
							</p>
						</span>
					</div>
					<p className='!mb-0 !mt-1 leading-none text-xs text-stone-500'>
						{parsed.updatedOn ? 'Published ' : ''}
						<time dateTime={new Date(parsed.publishedOn).toISOString()}>
							{new Date(parsed.publishedOn).toLocaleDateString('en-GB', {dateStyle: 'long'})}
						</time>
						{parsed.updatedOn ? ' · Updated ' : ''}
						<time dateTime={new Date(parsed.updatedOn ?? parsed.publishedOn).toISOString()} className={clsx({hidden: !parsed.updatedOn})}>
							{new Date(parsed.updatedOn ?? parsed.publishedOn).toLocaleDateString('en-GB', {dateStyle: 'long'})}
						</time>
					</p>
				</div>
			</div>
		</>
	);
};

export default BlogHeader;
