'use server'

import { PrismaProductDataSource } from '@/data/dataSource'
import { ProductRepositoryImpl } from '@/data/repository'
import { GetProductStockUseCase } from '@/domain/useCase'

const productsRepository = new ProductRepositoryImpl(new PrismaProductDataSource())
const stockUseCase = new GetProductStockUseCase(productsRepository)
export const getStockAction = async (slug: string) => {
  const stock = await stockUseCase.execute(slug)
  return stock
}