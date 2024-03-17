import "reflect-metadata";
import { inject, injectable } from 'inversify';

import { Product } from '../../model';
import { REPOSITORY_TYPES } from '@/di/repository/types';
import { ProductRepositoryImpl } from '@/data/repository';

@injectable()
export class GetProductsUseCase {
  constructor(
    @inject(REPOSITORY_TYPES.Product)
    private readonly factory: (dataSourceName: string) => ProductRepositoryImpl
  ) {}

  execute(source: string): Promise<Product[]> {
    const productRepository = this.factory(source);
    return productRepository.getAll()
  }
}
