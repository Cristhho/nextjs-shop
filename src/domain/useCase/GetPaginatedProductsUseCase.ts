import { PaginationOptions } from '../model';
import { ProductRepository } from '../repository/ProductRepository';

export class GetPaginatedProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(options: PaginationOptions) {
    return this.productRepository.getWithPagination(options)
  }
}