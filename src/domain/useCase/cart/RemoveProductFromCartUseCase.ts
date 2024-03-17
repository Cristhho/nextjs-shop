import { inject, injectable } from 'inversify';

import { Size } from '../../model';
import type { CartRepository } from '../../repository/CartRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class RemoveProductFromCartUseCase {

  constructor(@inject(REPOSITORY_TYPES.Cart) private readonly cartRepository: CartRepository) {}

  execute(id: string, size: Size) {
    this.cartRepository.removeProduct(id, size)
  }
}