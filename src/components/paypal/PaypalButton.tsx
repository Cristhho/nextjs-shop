'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js';
import { setTransaction } from '@/lib/actions';

type Props = {
  orderId: string,
  amount: number
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{isPending}] = usePayPalScriptReducer()
  const roundedAmount = Math.round(amount * 100) / 100

  const onCreateOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          //invoice_id: orderId,
          amount: {
            value: `${ roundedAmount }`,
          }

        }
      ]
    })

    const res = await setTransaction(orderId, transactionId)
    if (!res) throw new Error('No se pudo actualizar la orden')

    return transactionId
  }

  if (isPending) {
    return (
      <div className='animate-pulse'>
        <div className='h-10 bg-gray-300 rounded'></div>
      </div>
    )
  }

  return (
    <PayPalButtons
      style={{ layout: 'horizontal' }}
      createOrder={onCreateOrder}
    />
  )
}
