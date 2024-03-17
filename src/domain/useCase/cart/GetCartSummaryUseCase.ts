import { inject, injectable } from 'inversify';

import type { CartRepository } from '../../repository/CartRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class GetCartSummaryUseCase {

  constructor(@inject(REPOSITORY_TYPES.Cart) private readonly cartRepository: CartRepository) {}

  execute() {
    return this.cartRepository.getSummary()
  }
}