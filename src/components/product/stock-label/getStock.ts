'use server'

import { diInstance, init } from '@/di/CompositionRoot'
import { GetProductStockUseCase } from '@/domain/useCase'

init()

export const getStockAction = async (slug: string) => {
  const stock = await diInstance.get<GetProductStockUseCase>(GetProductStockUseCase).execute(slug)
  return stock
}