import { CreateProduct } from '@/domain/model';
import { ProductRepository } from '../../repository/ProductRepository';

export class SaveProductUseCase {

  constructor(private readonly productRepository: ProductRepository) {}

  execute(product: CreateProduct) {
    return this.productRepository.save(product)
  }
}