import Link from 'next/link';

const SiteHeader: React.FC = () => {
	return (
		<div className='flex gap-4 items-center mb-10'>
			<span>Adam Jones</span>
			<span>|</span>
			<Link href='/'>Home</Link>
			<Link href='/blog'>Blog</Link>
		</div>
	);
};

export default SiteHeader;
