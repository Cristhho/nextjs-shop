import { OrderRepository } from '@/domain/repository/OrderRepository';

export class SetTransactionUseCase {

  constructor(private readonly orderRepository: OrderRepository) {}

  execute(orderId: string, transaction: string) {
    return this.orderRepository.setTransaction(orderId, transaction)
  }
}