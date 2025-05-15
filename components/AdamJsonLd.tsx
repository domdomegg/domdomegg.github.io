import {type Person, type WithContext} from 'schema-dts';

export const jsonLd: WithContext<Person> = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	'@id': 'https://adamjones.me/',
	url: 'https://adamjones.me/',
	name: 'Adam Jones',
	givenName: 'Adam',
	familyName: 'Jones',
	image: {
		'@type': 'ImageObject',
		url: 'https://adamjones.me/images/profile-pic.webp',
		description: 'Headshot of Adam Jones',
	},
	sameAs: [
		'https://github.com/domdomegg',
		'https://www.linkedin.com/in/domdomegg/',
		'https://twitter.com/domdomegg',
		'https://stackoverflow.com/users/5352227/domdomegg',
		'https://www.npmjs.com/~domdomegg',
		'https://commons.wikimedia.org/wiki/User:Domdomegg',
		'https://en.wikipedia.org/wiki/User:Domdomegg',
		'https://wiki.openstreetmap.org/wiki/User:Domdomegg',
		'https://orcid.org/0009-0007-5138-9633',
	],
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'London',
		addressRegion: 'England',
		addressCountry: 'GB',
	},
	jobTitle: 'AI Safety Lead',
	worksFor: {
		'@type': 'Organization',
		name: 'BlueDot Impact',
		url: 'https://bluedot.org/',
	},
	affiliation: {
		'@type': 'Organization',
		name: 'Raise',
		url: 'https://www.joinraise.org/',
	},
	alumniOf: {
		'@type': 'CollegeOrUniversity',
		name: 'University of Warwick',
		url: 'https://warwick.ac.uk/',
	},
	knowsAbout: [
		'tech leadership',
		'software engineering',
		'AI safety',
		'open source software',
		'AI alignment',
		'AI governance',
	],
	knowsLanguage: ['English'],
};

export const AdamJsonLd: React.FC = () => {
	return (
		<script
			type='application/ld+json'
			dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
		/>
	);
};
