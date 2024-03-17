import { inject, injectable } from 'inversify';

import { Address } from '@/domain/model';
import type { CartRepository } from '../../repository/CartRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class SaveAddressUseCase {

  constructor(@inject(REPOSITORY_TYPES.Cart) private readonly cartRepository: CartRepository) {}

  execute(address: Address) {
    this.cartRepository.saveAddress(address)
  }
}