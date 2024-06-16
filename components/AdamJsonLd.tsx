import { Person, WithContext } from 'schema-dts';

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
  ],
};

export const AdamJsonLd: React.FC = () => {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
