import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const common = (
    // eslint-disable-next-line react/no-unknown-property
    <style jsx global>{`:root { --font-inter: ${inter.style.fontFamily}; }`}</style>
  );

  if (Component.displayName === 'MDXContent') {
    return (
      <>
        {common}
        <div className="max-w-sm md:max-w-2xl mx-auto px-8 py-12 md:my-24 prose animate-fade-up">
          <Component {...pageProps} />
        </div>
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
