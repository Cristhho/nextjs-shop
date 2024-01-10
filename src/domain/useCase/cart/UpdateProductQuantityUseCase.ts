import { CartProduct } from '../../model';
import { CartRepository } from '../../repository/CartRepository';

export class UpdateProductQuantityUseCase {

  constructor(private readonly cartRepository: CartRepository) {}

  execute(product: CartProduct, quantity: number) {
    this.cartRepository.updateProductQuantity(product, quantity)
  }
}