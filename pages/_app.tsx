import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import BlogHeader from '../components/BlogHeader';
import ProsePage from '../components/ProsePage';
import SiteHeader from '../components/SiteHeader';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const common = (
    // eslint-disable-next-line react/no-unknown-property
    <style jsx global>{`:root { --font-inter: ${inter.style.fontFamily}; }`}</style>
  );

  if (Component.displayName === 'MDXContent') {
    if ('frontmatter' in Component && typeof Component.frontmatter === 'object' && Component.frontmatter !== null && 'title' in Component.frontmatter) {
      return (
        <>
          {common}
          <ProsePage>
            <SiteHeader />
            <article itemScope itemType="https://schema.org/BlogPosting">
              <BlogHeader frontmatter={Component.frontmatter} />
              <div itemProp="articleBody">
                <Component {...pageProps} />
              </div>
            </article>
          </ProsePage>
        </>
      );
    }

    return (
      <>
        {common}
        <ProsePage>
          <SiteHeader />
          <Component {...pageProps} />
        </ProsePage>
      </>
    );
  }

  return (
    <>
      {common}
      <Component {...pageProps} />
    </>
  );
};

export default App;
