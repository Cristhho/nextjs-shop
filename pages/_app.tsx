import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from 'swr';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { lightTheme } from '../themes';
import { AuthProvider, CartProvider, UiProvider } from '../context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <PayPalScriptProvider options={{
                  'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ''
                }}>
                  <Component {...pageProps} />
                </PayPalScriptProvider>
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp
