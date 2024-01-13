import { OrderRepository } from '@/domain/repository/OrderRepository';

export class GetOrderByIdUseCase {

  constructor(private readonly orderRepository: OrderRepository) {}

  execute(orderId: string, userId: string, isAdmin: boolean) {
    return this.orderRepository.getById(orderId, userId, isAdmin)
  }
}