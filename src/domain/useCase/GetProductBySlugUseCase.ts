import { ProductRepository } from '../repository/ProductRepository';

export class GetProductBySlugUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(slug: string) {
    return this.productRepository.getBySlug(slug)
  }
}