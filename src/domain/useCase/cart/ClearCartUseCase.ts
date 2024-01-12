import { CartRepository } from '../../repository/CartRepository';

export class ClearCartUseCase {

  constructor(private readonly cartRepository: CartRepository) {}

  execute() {
    this.cartRepository.clearCart()
  }
}
