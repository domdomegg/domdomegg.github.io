import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import BlogHeader from '../components/BlogHeader';
import ProsePage from '../components/ProsePage';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const common = (
    // eslint-disable-next-line react/no-unknown-property
    <style jsx global>{`:root { --font-inter: ${inter.style.fontFamily}; }`}</style>
  );

  if (Component.displayName === 'MDXContent') {
    if ('frontmatter' in pageProps) {
      return (
        <>
          {common}
          <ProsePage>
            <article itemScope itemType="https://schema.org/BlogPosting">
              <BlogHeader frontmatter={pageProps.frontmatter} />
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
