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
	const post = posts
		.sort((a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime())
		.find((p) => {
			const publishedDate = new Date(p.publishedOn);
			const now = new Date();
			const daysSincePublished = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24));

			return daysSincePublished <= 14 && daysSincePublished >= 0;
		});
	if (!post) {
		return null;
	}

	const daysAgo = calcDaysAgo(post.publishedOn);

	return (
		<div className='-mb-4 px-5 bg-red-100 dark:bg-red-950 border border-transparent rounded-lg'>
			<p className='text-red-700 font-semibold'>
				<span className='font-bold'>new: </span>
				<Link href={post.href} className='text-red-950'>{post.title}</Link>
				&nbsp;
				<span className='text-sm'>(published {formatDaysAgo(daysAgo)})</span>
			</p>
		</div>
	);
};
