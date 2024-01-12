import { Address, OrderDetail, OrderProduct } from '../model';

export interface OrderRepository {
  save(products: OrderProduct[], address: Address, userId: string): Promise<string>
  getByUser(userId: string): Promise<void>
  getById(orderId: string, userId: string): Promise<OrderDetail|null>
}