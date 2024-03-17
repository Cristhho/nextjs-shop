'use server'

import { revalidatePath } from 'next/cache'

import { getPayPalBearerToken, verifyPayPalPayment } from './paypal'
import { diInstance, init } from '@/di/CompositionRoot'
import { PayOrderUseCase } from '@/domain/useCase'

init()

export const checkPaypalPayment = async (transactionId: string) => {
  const authToken = await getPayPalBearerToken()
  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo obtener token de verificación',
    }
  }

  const resp = await verifyPayPalPayment( transactionId, authToken )
  if ( !resp ) {
    return {
      ok: false,
      message: 'Error al verificar el pago'
    }
  }

  const { status, purchase_units } = resp
  const { invoice_id: orderId } = purchase_units[0]
  if ( status !== 'COMPLETED' ) {
    return {
      ok: false,
      message: 'Aún no se ha pagado en PayPal'
    }
  }

  try {
    await diInstance.get<PayOrderUseCase>(PayOrderUseCase).execute(orderId)

    revalidatePath(`/orders/${ orderId }`)
    return {
      ok: true,
      message: ''
    }
  } catch (error) {
    return {
      ok: false,
      message: '500 - El pago no se pudo realizar'
    }
  }
}
