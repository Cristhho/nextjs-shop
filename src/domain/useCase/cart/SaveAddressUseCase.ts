import { Address } from '@/domain/model';
import { CartRepository } from '../../repository/CartRepository';

export class SaveAddressUseCase {

  constructor(private readonly cartRepository: CartRepository) {}

  execute(address: Address) {
    this.cartRepository.saveAddress(address)
  }
}