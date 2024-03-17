'use server'

import { auth } from '@/auth.config';
import { diInstance, init } from '@/di/CompositionRoot';
import { Address, OrderProduct } from '@/domain/model';
import { SaveOrderUseCase, SetTransactionUseCase } from '@/domain/useCase';

init()

export const placeOrder = async (products: OrderProduct[], address: Address) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      order: '',
      message: 'No hay sesión de usuario'
    };
  }

  try {
    const order = await diInstance.get<SaveOrderUseCase>(SaveOrderUseCase).execute(products, address, userId)
    return {
      ok: true,
      order: order,
      message: ''
    }
  } catch (error: any) {
    return {
      ok: false,
      order: '',
      message: error?.message as string
    };
  }
}

export const setTransaction = async (orderId: string, transaction: string) => {
  try {
    const result = await diInstance.get<SetTransactionUseCase>(SetTransactionUseCase).execute(orderId, transaction)

    return result
  } catch (error) {
    return false
  }
}
