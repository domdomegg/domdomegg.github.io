import Link from 'next/link';
import {type Post} from './BlogHeader';

type NewBlogArticlePromoProps = {
	posts: Post[];
};

const calcDaysAgo = (date: string): number => {
	const diffTime = Date.now() - new Date(date).getTime();
	return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

const formatDaysAgo = (daysAgo: number): string => {
	if (daysAgo === 0) {
		return 'today';
	}

	if (daysAgo === 1) {
		return 'yesterday';
	}

	return `${daysAgo} days ago`;
};

export const NewBlogArticlePromo: React.FC<NewBlogArticlePromoProps> = ({posts}) => {
	const recentPosts = posts
		.sort((a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime())
		.filter((p, index) => {
			const publishedDate = new Date(p.publishedOn);
			const now = new Date();
			const daysSincePublished = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24));

			// Always hide posts in the future
			if (daysSincePublished < 0) {
				return false;
			}

			// Always show posts that are less than 7 days old
			if (daysSincePublished < 7) {
				return true;
			}

			// Otherwise show the post if it was published in the last 14 days AND is in the 3 most recent
			return daysSincePublished <= 14 && index < 3;
		});

	if (recentPosts.length === 0) {
		return null;
	}

	if (recentPosts.length === 1) {
		const post = recentPosts[0];
		const daysAgo = calcDaysAgo(post.publishedOn);

		return (
			<div className='-mt-1 -mb-4 px-5 bg-red-100 dark:bg-red-950 border border-transparent rounded-lg'>
				<p className='text-red-700 font-semibold'>
					<span className='font-bold'>new: </span>
					<Link href={post.href} className='text-red-950'>{post.title}</Link>
					&nbsp;
					<span className='text-sm'>(published {formatDaysAgo(daysAgo)})</span>
				</p>
			</div>
		);
	}

	return (
		<div className='-mt-1 -mb-4 px-5 bg-red-100 dark:bg-red-950 border border-transparent rounded-lg'>
			<p className='text-red-700 font-semibold'>
				<span className='font-bold'>new:</span>
			</p>
			<ul className='text-red-700 font-semibold list-disc list-inside pl-2 -mt-2 marker:text-red-700'>
				{recentPosts.map((post) => {
					const daysAgo = calcDaysAgo(post.publishedOn);
					return (
						<li key={post.href}>
							<Link href={post.href} className='text-red-950'>{post.title}</Link>
							&nbsp;
							<span className='text-sm'>({formatDaysAgo(daysAgo)})</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
