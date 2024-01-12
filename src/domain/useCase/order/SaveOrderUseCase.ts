import { Address, OrderProduct } from '@/domain/model';
import { OrderRepository } from '@/domain/repository/OrderRepository';

export class SaveOrderUseCase {

  constructor(private readonly orderRepository: OrderRepository) {}

  execute(products: OrderProduct[], address: Address, userId: string) {
    return this.orderRepository.save(products, address, userId)
  }
}