'use client'

import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

type Props = PropsWithChildren

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
        intent: 'capture',
        currency: 'USD'
      }}>
        {children}
      </PayPalScriptProvider>
    </SessionProvider>
  )
}
