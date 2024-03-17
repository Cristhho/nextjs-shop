import { inject, injectable } from 'inversify';

import { PaginationOptions } from '@/domain/model';
import type { OrderRepository } from '@/domain/repository/OrderRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class GetPaginatedOrdersUseCase {

  constructor(@inject(REPOSITORY_TYPES.Order) private readonly orderRepository: OrderRepository) {}

  execute(options: PaginationOptions) {
    return this.orderRepository.getWithPagination(options)
  }

}