'use client'

import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { init } from '@/di/CompositionRoot'

type Props = PropsWithChildren

init()

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
