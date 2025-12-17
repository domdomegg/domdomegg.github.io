export type Project = {
	title: string;
	tagline: string;
	imageSrc?: string;
	imageIsWindowShot?: boolean;
	href: string;
	date: string;
};

export const projects: Project[] = [
	{
		title: 'AWS Email Simulator',
		tagline: 'Test emails without AWS credentials. Downloaded over 1 million times.',
		imageSrc: '/images/projects/aws-ses-v2-local.png',
		imageIsWindowShot: true,
		href: 'https://github.com/domdomegg/aws-ses-v2-local',
		date: '2021-11-01',
	},
	{
		title: 'YouTube Thumbnail Hider',
		tagline: 'Browser extension with >50,000 weekly users and 100+ 5-star reviews.',
		imageSrc: '/images/projects/hide-youtube-thumbnails.png',
		href: 'https://chromewebstore.google.com/detail/hide-youtube-thumbnails/phmcfcbljjdlomoipaffekhgfnpndbef',
		date: '2020-06-01',
	},
	{
		title: 'Serverless Offline Watcher',
		tagline: 'Developer tool for extending Serverless framework. Downloaded 450,000+ times.',
		imageSrc: '/images/projects/serverless-offline-watcher.png',
		imageIsWindowShot: true,
		href: 'https://www.npmjs.com/package/serverless-offline-watcher',
		date: '2021-01-01',
	},
	{
		title: 'TypeScript Airtable Library',
		tagline: 'Makes building apps on top of Airtable way easier.',
		imageSrc: '/images/projects/airtable-ts.png',
		href: 'https://www.npmjs.com/package/airtable-ts',
		date: '2022-03-01',
	},
	{
		title: 'Airtable MCP Server',
		tagline: 'Model Context Protocol server for Airtable. 125+ forks on GitHub.',
		imageSrc: '/images/projects/airtable-mcp-server.png',
		imageIsWindowShot: true,
		href: 'https://github.com/domdomegg/airtable-mcp-server',
		date: '2024-11-01',
	},
	{
		title: 'Apply for Postal Vote Service',
		tagline: 'First proper electronic version of the UK postal vote form.',
		imageSrc: '/images/projects/postal-vote.png',
		imageIsWindowShot: true,
		href: 'https://github.com/domdomegg/postal-vote/',
		date: '2023-05-01',
	},
	{
		title: 'London Cycle Parking',
		tagline: 'Find cycle parking quickly in London.',
		imageSrc: '/images/projects/london-cycle-parking.png',
		imageIsWindowShot: true,
		href: 'https://adamjones.me/london-cycle-parking/',
		date: '2022-08-01',
	},
	{
		title: 'ISA Tracking SDK',
		tagline: 'Compatible with 4 brokers. Tracks ISA performance daily for 6+ years.',
		imageSrc: '/images/projects/halifax-share-dealing-sdk.png',
		href: 'https://github.com/domdomegg/halifax-share-dealing-sdk',
		date: '2019-01-01',
	},
	{
		title: 'PDF Scanner',
		tagline: 'Add a convincing scanned look to documents.',
		imageSrc: '/images/projects/pdf-scanner.jpg',
		href: 'https://github.com/domdomegg/pdf-scanner',
		date: '2023-02-01',
	},
	{
		title: 'RSA SecurID Library',
		tagline: 'Reverse-engineered security token generator with browser extension.',
		imageSrc: '/images/projects/rsa-securid.png',
		href: 'https://github.com/domdomegg/rsa-securid',
		date: '2022-01-01',
	},
	{
		title: 'TypeScript i18n Library',
		tagline: 'Lightweight, flexible, and fully type-safe translation framework.',
		imageSrc: '/images/projects/ts-i18n.png',
		imageIsWindowShot: true,
		href: 'https://github.com/domdomegg/ts-i18n',
		date: '2023-08-01',
	},
	{
		title: 'Google Doc to LaTeX',
		tagline: 'Converter that makes writing LaTeX a piece of cake.',
		imageSrc: '/images/projects/gdoc2latex.png',
		href: 'https://adamjones.me/gdoc2latex-gui',
		date: '2021-05-01',
	},
	{
		title: 'Discord Reminder Bot',
		tagline: 'Send reminders from GitHub. 2 minute setup.',
		imageSrc: '/images/projects/discord-reminder-template.png',
		href: 'https://github.com/domdomegg/discord-reminder-template',
		date: '2023-01-01',
	},
	{
		title: 'Day Visualiser',
		tagline: 'See how fast the day is slipping away from you.',
		imageSrc: '/images/projects/oneday.png',
		imageIsWindowShot: true,
		href: 'https://adamjones.me/oneday',
		date: '2022-12-01',
	},
	{
		title: 'Wikimedia Commons contributor',
		tagline: 'Free media used in textbooks, papers, and YouTube videos with millions of views.',
		imageSrc: '/images/projects/wikimedia-contributions.png',
		href: 'https://commons.wikimedia.org/wiki/User:Domdomegg',
		date: '2018-01-01',
	},
	{
		title: 'YouTube channel',
		tagline: 'I made a series about type theory, and occasionally post other things',
		imageSrc: '/images/projects/youtube.png',
		href: 'https://www.youtube.com/@adam-jones',
		date: '2022-04-06',
	},
];

export function getSortedProjects(): Project[] {
	return [...projects].sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}
