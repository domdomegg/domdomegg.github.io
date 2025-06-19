import clsx from 'clsx';
import Link from 'next/link';
import {useRouter} from 'next/router';

const SiteHeader: React.FC = () => {
	const {pathname} = useRouter();

	return (
		<nav className='flex gap-4 justify-between items-center my-12 text-lg lowercase'>
			<Link className={clsx('text-red-600 text-2xl font-bold no-underline transition-all border-b-2 hover:border-b-inherit active:scale-95 leading-none hover:pb-1 hover:-mb-1', pathname === '/' ? 'border-b-red-600 pb-1 -mb-1' : 'border-b-transparent')} href='/'>Adam Jones</Link>
			<Link className={clsx('no-underline transition-all border-b-2 hover:border-b-inherit active:scale-95 leading-none hover:pb-1 hover:-mb-1', pathname === '/blog' ? 'border-b-inherit pb-1 -mb-1' : 'border-b-transparent')} href='/blog'>Blog</Link>
		</nav>
	);
};

export default SiteHeader;
