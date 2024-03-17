import { CreateProduct } from '@/domain/model';
import { ProductRepository } from '../../repository/ProductRepository';
import { inject, injectable } from 'inversify';
import { REPOSITORY_TYPES } from '@/di/repository/types';
import { ProductRepositoryImpl } from '@/data/repository';

@injectable()
export class SaveProductUseCase {
  private readonly productRepository: ProductRepository

  constructor(
    @inject(REPOSITORY_TYPES.Product)
    private readonly factory: (dataSourceName: string) => ProductRepositoryImpl
  ) {
    this.productRepository = this.factory('prisma');
  }

  execute(product: CreateProduct) {
    return this.productRepository.save(product)
  }
}