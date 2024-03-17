import { inject, injectable } from 'inversify';

import { REPOSITORY_TYPES } from '@/di/repository/types';
import type { OrderRepository } from '@/domain/repository/OrderRepository';

@injectable()
export class GetOrderByIdUseCase {

  constructor(@inject(REPOSITORY_TYPES.Order) private readonly orderRepository: OrderRepository) {}

  execute(orderId: string, userId: string, isAdmin: boolean) {
    return this.orderRepository.getById(orderId, userId, isAdmin)
  }
}