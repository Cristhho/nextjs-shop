import { inject, injectable } from 'inversify';

import { REPOSITORY_TYPES } from '@/di/repository/types';
import { Address, OrderProduct } from '@/domain/model';
import type { OrderRepository } from '@/domain/repository/OrderRepository';

@injectable()
export class SaveOrderUseCase {

  constructor(@inject(REPOSITORY_TYPES.Order) private readonly orderRepository: OrderRepository) {}

  execute(products: OrderProduct[], address: Address, userId: string) {
    return this.orderRepository.save(products, address, userId)
  }
}