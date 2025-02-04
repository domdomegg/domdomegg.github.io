const SiteHeader: React.FC = () => {
	return (
		<div className='flex gap-4 items-center mb-10'>
			<span>Adam Jones</span>
			<span>|</span>
			<a href='/'>Home</a>
			<a href='/blog'>Blog</a>
		</div>
	);
};

export default SiteHeader;
