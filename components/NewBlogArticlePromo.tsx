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

const formatDaysAgoRange = (daysAgo: number): string => {
	if (daysAgo === 0) {
		return 'today';
	}

	if (daysAgo < 7) {
		return 'this week';
	}

	return 'recently';
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
		<div className='-mb-4 px-5 bg-blue-50 border border-blue-200 rounded-lg'>
			<p className='text-blue-900'>
				<span className='font-bold'>New {formatDaysAgoRange(daysAgo)}: </span>
				<a href={post.absoluteUrl} className='underline'>{post.title}</a>
        &nbsp;
				<span className='text-sm'>(published {formatDaysAgo(daysAgo)})</span>
			</p>
		</div>
	);
};
