const RedirectPage = () => {
	if (typeof window !== 'undefined') {
		window.location.replace('/blog/adamcon-2026');
	}

	return <div />;
};

export default RedirectPage;
