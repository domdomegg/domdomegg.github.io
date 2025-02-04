const RedirectPage = () => {
	if (typeof window !== 'undefined') {
		window.location.replace('/privacy');
	}

	return <div />;
};

export default RedirectPage;
