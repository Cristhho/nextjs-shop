import { Product } from '../model';
import { ProductRepository } from '../repository/ProductRepository';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(products: Product[]): Promise<boolean> {
    return this.productRepository.saveMany(products)
  }
}