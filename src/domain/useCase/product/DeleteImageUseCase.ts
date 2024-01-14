import { ProductRepository } from '../../repository/ProductRepository';

export class DeleteImageUseCase {

  constructor(private readonly productRepository: ProductRepository) {}

  execute(imageId: number) {
    return this.productRepository.deleteImage(imageId)
  }

}