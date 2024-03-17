import { inject, injectable } from 'inversify';

import type { OrderRepository } from '@/domain/repository/OrderRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class SetTransactionUseCase {

  constructor(@inject(REPOSITORY_TYPES.Order) private readonly orderRepository: OrderRepository) {}

  execute(orderId: string, transaction: string) {
    return this.orderRepository.setTransaction(orderId, transaction)
  }
}