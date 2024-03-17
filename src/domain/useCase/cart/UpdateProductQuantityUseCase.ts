import { inject, injectable } from 'inversify';

import { CartProduct } from '../../model';
import type { CartRepository } from '../../repository/CartRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class UpdateProductQuantityUseCase {

  constructor(@inject(REPOSITORY_TYPES.Cart) private readonly cartRepository: CartRepository) {}

  execute(product: CartProduct, quantity: number) {
    this.cartRepository.updateProductQuantity(product, quantity)
  }
}