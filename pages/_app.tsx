import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import type { Toc } from '@stefanprobst/rehype-extract-toc';
import BlogHeader from '../components/BlogHeader';
import ProsePage from '../components/ProsePage';
import SiteHeader from '../components/SiteHeader';
import TableOfContents from '../components/TableOfContents';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] });

if (typeof window !== 'undefined') { // checks that we are client-side
  posthog.init('phc_yZ6zilX74HsRDdqv4JXMzF3o0fEtQvvSGHEfrONN5MH', {
    api_host: 'https://eu.i.posthog.com',
  });
}

const App: React.FC<AppProps> = (props) => {
  return (
    <PostHogProvider>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`:root { --font-inter: ${inter.style.fontFamily}; }`}</style>
      {/* Cloudflare analytics */}
      <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "211b612bd6db41308a0d09319d6a408a"}' />
      <InnerApp {...props} />
    </PostHogProvider>
  );
};

const InnerApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  if (Component.displayName === 'MDXContent') {
    // Blog pages
    if ('frontmatter' in Component && typeof Component.frontmatter === 'object' && Component.frontmatter !== null && 'title' in Component.frontmatter && 'href' in Component && typeof Component.href === 'string') {
      return (
        <div className="lg:ml-80 xl:ml-20 2xl:ml-0">
          <ProsePage>
            <SiteHeader />
            <div className="sticky self-start top-8 hidden lg:block">
              <div className="relative right-full">
                <div className="absolute -top-8 pt-8 right-16 max-h-screen overflow-y-auto w-1/2">
                  <TableOfContents title={Component.frontmatter.title as string} tableOfContents={pageProps.tableOfContents as Toc} />
                </div>
              </div>
            </div>
            <article>
              <BlogHeader frontmatter={Component.frontmatter} href={Component.href} />
              <Component {...pageProps} />
            </article>
          </ProsePage>
        </div>
      );
    }

    // Other MDX pages
    return (
      <ProsePage>
        <SiteHeader />
        <Component {...pageProps} />
      </ProsePage>
    );
  }

  // Custom React pages
  return (
    <Component {...pageProps} />
  );
};

export default App;
