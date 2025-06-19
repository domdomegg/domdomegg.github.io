const RedirectPage = () => {
	if (typeof window !== 'undefined') {
		window.location.replace('/blog/reviewing-your-work');
	}

	return <div />;
};

export default RedirectPage;
