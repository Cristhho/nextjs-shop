import { inject, injectable } from 'inversify';
import { ProductsPaginationOptions } from '../../model';
import { ProductRepository } from '../../repository/ProductRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';
import { ProductRepositoryImpl } from '@/data/repository';

@injectable()
export class GetPaginatedProductsUseCase {
  private readonly productRepository: ProductRepository;

  constructor(
    @inject(REPOSITORY_TYPES.Product)
    private readonly factory: (dataSourceName: string) => ProductRepositoryImpl
  ) {
    this.productRepository = this.factory('prisma');
  }

  execute(options: ProductsPaginationOptions) {
    return this.productRepository.getWithPagination(options)
  }
}