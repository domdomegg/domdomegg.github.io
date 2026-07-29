import Head from 'next/head';

type RedirectProps = {
	/** Where to send the visitor. Can be a path on this site, or an external URL. */
	to: string;
	/**
	 * Carry the URL fragment across, so a deep link like /old-page/#some-section
	 * lands on that section of the target rather than its top. Only useful when
	 * redirecting to a page with matching anchors.
	 */
	preserveHash?: boolean;
};

/**
 * Client-side redirect. The site is a static export, so it can't issue real
 * 3xx redirects - this stands in for them, with a meta refresh as a fallback
 * for when JavaScript doesn't run.
 */
export const Redirect: React.FC<RedirectProps> = ({to, preserveHash = false}) => {
	if (typeof window !== 'undefined') {
		window.location.replace(preserveHash ? to + window.location.hash : to);
	}

	return (
		<>
			<Head>
				<meta httpEquiv='refresh' content={`0; url=${to}`} />
				<meta name='robots' content='noindex' />
			</Head>
			<div />
		</>
	);
};

export default Redirect;
