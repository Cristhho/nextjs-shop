import { PaginationOptions } from '@/domain/model';
import { OrderRepository } from '@/domain/repository/OrderRepository';

export class GetPaginatedOrdersUseCase {

  constructor(private readonly orderRepository: OrderRepository) {}

  execute(options: PaginationOptions) {
    return this.orderRepository.getWithPagination(options)
  }

}