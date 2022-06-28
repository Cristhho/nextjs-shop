import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

import Navbar from '../ui/Navbar';

type ShopLayoutProps = {
  title: string;
  pageDescription: string;
  imageFullUrl?: string;
}

const ShopLayout: FC<PropsWithChildren<ShopLayoutProps>> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />
        {
          imageFullUrl &&
            <meta name='og:image' content={imageFullUrl} />
        }
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0 30px'
      }}>
        {children}
      </main>
      <footer></footer>
    </>
  )
}

export default ShopLayout