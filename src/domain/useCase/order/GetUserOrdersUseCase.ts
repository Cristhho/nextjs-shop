import { inject, injectable } from 'inversify';

import type { OrderRepository } from '@/domain/repository/OrderRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class GetUserOrdersUseCase {

  constructor(@inject(REPOSITORY_TYPES.Order) private readonly orderRepository: OrderRepository) {}

  execute(userId: string) {
    return this.orderRepository.getByUser(userId)
  }
}