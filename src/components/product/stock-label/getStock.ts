'use server'

import { di } from '@/di/DependenciesLocator'

export const getStockAction = async (slug: string) => {
  const stock = await di.GetProductStockUseCase.execute(slug)
  return stock
}