import { inject, injectable } from 'inversify';

import { Product } from '../../model';
import { REPOSITORY_TYPES } from '@/di/repository/types';
import { ProductRepositoryImpl } from '@/data/repository';
import { ProductRepository } from '@/domain/repository/ProductRepository';

@injectable()
export class CreateProductUseCase {
  private productRepository: ProductRepository;

  constructor(
    @inject(REPOSITORY_TYPES.Product)
    private readonly factory: (dataSourceName: string) => ProductRepositoryImpl
  ) {
    this.productRepository = this.factory('prisma');
  }

  execute(products: Product[]): Promise<boolean> {
    return this.productRepository.saveMany(products)
  }
}