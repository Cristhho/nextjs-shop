import { ProductRepository } from '../repository';
import { Product } from '../model';

export class GetProductsUseCase {
  private productRepository: ProductRepository;

  constructor (productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  excecute(gender: string): Promise<Product[]> {
    return this.productRepository.get(gender);
  }
}