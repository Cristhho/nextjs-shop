'use client'

import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
