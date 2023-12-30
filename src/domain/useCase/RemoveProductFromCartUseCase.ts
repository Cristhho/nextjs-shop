import { Size } from '../model';
import { CartRepository } from '../repository/CartRepository';

export class RemoveProductFromCartUseCase {

  constructor(private readonly cartRepository: CartRepository) {}

  execute(id: string, size: Size) {
    this.cartRepository.removeProduct(id, size)
  }
}