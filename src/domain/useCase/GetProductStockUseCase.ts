import { ProductRepository } from "../repository/ProductRepository";

export class GetProductStockUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  execute(slug: string) {
    return this.productRepository.getProductStock(slug)
  }
}