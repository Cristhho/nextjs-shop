'use server'

import { auth } from '@/auth.config';
import { di } from '@/di/DependenciesLocator';
import { Address, OrderProduct } from '@/domain/model';

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
    const order = await di.SaveOrderUseCase.execute(products, address, userId)
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
