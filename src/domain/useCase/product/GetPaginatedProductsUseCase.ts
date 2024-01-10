import { ProductsPaginationOptions } from '../../model';
import { ProductRepository } from '../../repository/ProductRepository';

export class GetPaginatedProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(options: ProductsPaginationOptions) {
    return this.productRepository.getWithPagination(options)
  }
}