import { OrderRepository } from '@/domain/repository/OrderRepository';

export class GetUserOrdersUseCase {

  constructor(private readonly orderRepository: OrderRepository) {}

  execute(userId: string) {
    return this.orderRepository.getByUser(userId)
  }
}