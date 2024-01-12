import { OrderRepository } from '@/domain/repository/OrderRepository';

export class PayOrderUseCase {

  constructor(private readonly orderRepository: OrderRepository) {}

  execute(orderId: string) {
    return this.orderRepository.payOrder(orderId)
  }
}