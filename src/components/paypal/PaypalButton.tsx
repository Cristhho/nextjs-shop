'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

export const PaypalButton = () => {
  const [{isPending}] = usePayPalScriptReducer()

  if (isPending) {
    return (
      <div className='animate-pulse'>
        <div className='h-10 bg-gray-300 rounded'></div>
      </div>
    )
  }

  return (
    <PayPalButtons style={{ layout: 'horizontal' }} />
  )
}
