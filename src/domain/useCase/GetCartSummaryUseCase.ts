import { CartRepository } from '../repository/CartRepository';

export class GetCartSummaryUseCase {

  constructor(private readonly cartRepository: CartRepository) {}

  execute() {
    return this.cartRepository.getSummary()
  }
}