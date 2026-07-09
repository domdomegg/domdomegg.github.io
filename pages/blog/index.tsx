import {type GetStaticProps} from 'next';
import Head from 'next/head';
import {type Blog, type BlogPosting, type WithContext} from 'schema-dts';
import ProsePage from '../../components/ProsePage';
import SiteHeader from '../../components/SiteHeader';
import {type Post} from '../../components/BlogHeader';
import {NewBlogArticlePromo} from '../../components/NewBlogArticlePromo';
import {getSortedPostsData, writeRssFeed} from '../../lib/blog';
import Link from 'next/link';

type BlogIndexProps = {
	posts: Post[];
};

const featuredAiSafetyHrefs = [
	'/blog/what-is-agi/',
	'/blog/how-agi-could-kill-usa-democracy/',
	'/blog/coalition-of-democracies-solves-agi-risks/',
	'/blog/rough-alignment-plan-early-2025/',
	'/blog/uk-agi-plan-2025/',
	'/blog/ai-regulator-toolbox/',
];

const featuredOtherHrefs = [
	'/blog/empathetic-role-playing/',
	'/blog/local-llms-speed-early-2026/',
	'/blog/poa-better/',
	'/blog/mcp-composability/',
];

const BlogIndex: React.FC<BlogIndexProps> = ({posts}) => {
	const publishedPosts = posts.filter((p) => Date.now() >= new Date(p.publishedOn).getTime());
	const getPost = (href: string): Post => {
		const post = publishedPosts.find((p) => p.href === href);
		if (!post) {
			throw new Error(`Featured post not found or not yet published: ${href}`);
		}

		return post;
	};

	const featuredAiSafetyPosts = featuredAiSafetyHrefs.map(getPost);
	const featuredOtherPosts = featuredOtherHrefs.map(getPost);

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
		blogPost: publishedPosts.map<BlogPosting>((p) => ({
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
				<link rel='alternate' type='application/rss+xml' title='RSS' href='/blog/feed.xml' />
			</Head>
			<h1>Adam Jones's Blog</h1>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
			/>
			<NewBlogArticlePromo posts={posts} />
			<div className='mt-8 -mb-4 px-5 bg-stone-100 dark:bg-stone-900 border border-transparent rounded-lg'>
				<p className='font-bold'>selected</p>
				<p className='text-sm text-stone-500 font-semibold -mt-4'>on AI safety</p>
				<ul className='list-disc -mt-2'>
					{featuredAiSafetyPosts.map((post) => (
						<li key={post.href}>
							<Link href={post.href}>{post.title}</Link>
							{post.location === 'external' && <>{' '}<span className='bg-stone-300 dark:bg-stone-800 rounded-full text-xs px-2'>External</span></>}
						</li>
					))}
				</ul>
				<p className='text-sm text-stone-500 font-semibold'>on everything else</p>
				<ul className='list-disc -mt-2'>
					{featuredOtherPosts.map((post) => (
						<li key={post.href}>
							<Link href={post.href}>{post.title}</Link>
							{post.location === 'external' && <>{' '}<span className='bg-stone-300 dark:bg-stone-800 rounded-full text-xs px-2'>External</span></>}
						</li>
					))}
				</ul>
			</div>
			<p className='font-bold !mb-0 mt-12'>all</p>
			<p className='text-sm !mt-2'>
				There are a lot of posts here, on quite different topics. This site is fairly friendly for AI agents to browse, so one way to find what's relevant to you is to paste this into your AI assistant of choice:
			</p>
			<blockquote className='text-sm'>
				Browse https://adamjones.me/blog/ and the posts linked from it. Based on what you know about me, suggest 3–5 posts that are most relevant to me, with a sentence on why for each.
			</blockquote>
			<ul>
				{publishedPosts.map((post) => (
					<li key={post.href}>
						<Link href={post.href}>{post.title}</Link>
						{post.location === 'external' && (
							<>
								{' '}
								<span className='relative inline-block'>
									<button type='button' className='cursor-auto p-2 -my-6 -mx-2'>
										<span className='bg-stone-300 dark:bg-stone-800 rounded-full text-xs px-2'>external</span>
									</button>
									<span className='absolute left-0 top-full block bg-white dark:bg-stone-800 border w-72 border-stone-300 dark:border-stone-600 rounded-sm shadow-sm px-3 py-1 text-xs z-10 transition-all origin-top-left invisible scale-0 [button:hover_+_&]:visible [button:focus-within_+_&]:visible hover:visible focus-within:visible [button:hover_+_&]:scale-100 [button:focus-within_+_&]:scale-100 hover:scale-100 focus-within:scale-100 normal-case font-normal'>
										<p className='!my-1'>
											Published elsewhere, not on this site.
										</p>
									</span>
								</span>
							</>
						)}
						{post.highvol && (
							<>
								{' '}
								<span className='relative inline-block'>
									<button type='button' className='cursor-auto p-2 -my-6 -mx-2'>
										<span className='bg-stone-300 dark:bg-stone-800 rounded-full text-xs px-2'>highvol</span>
									</button>
									<span className='absolute left-0 top-full block bg-white dark:bg-stone-800 border w-72 border-stone-300 dark:border-stone-600 rounded-sm shadow-sm px-3 py-1 text-xs z-10 transition-all origin-top-left invisible scale-0 [button:hover_+_&]:visible [button:focus-within_+_&]:visible hover:visible focus-within:visible [button:hover_+_&]:scale-100 [button:focus-within_+_&]:scale-100 hover:scale-100 focus-within:scale-100 normal-case font-normal'>
										<p className='!my-1'>
											A lower-priority post: either lower-effort than my usual writing, or reference content that most subscribers won't care about.
										</p>
									</span>
								</span>
							</>
						)}
						<span className='text-xs text-stone-500'>
							{' '}
							—
							{' '}
							<time dateTime={new Date(post.publishedOn).toISOString()}>
								{new Date(post.publishedOn).toLocaleDateString('en-GB', {dateStyle: 'long'})}
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
	writeRssFeed(posts.filter((p) => Date.now() >= new Date(p.publishedOn).getTime() && !p.highvol));

	return {
		props: {
			posts,
		},
	};
};
