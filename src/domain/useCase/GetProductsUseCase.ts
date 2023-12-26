import { Product } from '../model';
import { ProductRepository } from '../repository/ProductRepository';

export class GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(): Promise<Product[]> {
    return this.productRepository.getAll()
  }
}
