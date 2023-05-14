import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { lightTheme } from '../themes';
import { AuthProvider, CartProvider, UiProvider } from '../context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
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
    </SessionProvider>
  );
}

export default MyApp
