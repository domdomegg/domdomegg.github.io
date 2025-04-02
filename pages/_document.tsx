import {
	Html, Main, Head, NextScript,
} from 'next/document';

const Document: React.FC = () => {
	return (
		<Html lang='en'>
			<Head>
				<meta name='author' content='Adam Jones (domdomegg)' />
				<link rel='icon' href='/favicon.ico' />
				<meta name='darkreader-lock' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
