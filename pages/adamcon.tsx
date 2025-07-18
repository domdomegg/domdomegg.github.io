const RedirectPage = () => {
	if (typeof window !== 'undefined') {
		window.location.replace('/blog/adamcon');
	}

	return <div />;
};

export default RedirectPage;
