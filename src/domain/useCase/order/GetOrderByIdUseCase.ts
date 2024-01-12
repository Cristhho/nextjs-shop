import { OrderRepository } from '@/domain/repository/OrderRepository';

export class GetOrderByIdUseCase {

  constructor(private readonly orderRepository: OrderRepository) {}

  execute(orderId: string, userId: string) {
    return this.orderRepository.getById(orderId, userId)
  }
}