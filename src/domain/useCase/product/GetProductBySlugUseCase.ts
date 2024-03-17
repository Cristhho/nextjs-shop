import { inject, injectable } from 'inversify';

import { ProductRepository } from '../../repository/ProductRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';
import { ProductRepositoryImpl } from '@/data/repository';

@injectable()
export class GetProductBySlugUseCase {
  private readonly productRepository: ProductRepository

  constructor(
    @inject(REPOSITORY_TYPES.Product)
    private readonly factory: (dataSourceName: string) => ProductRepositoryImpl
  ) {
    this.productRepository = this.factory('prisma');
  }

  execute(slug: string) {
    return this.productRepository.getBySlug(slug)
  }
}