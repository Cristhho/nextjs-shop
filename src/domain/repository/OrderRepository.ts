import { Address, Order, OrderDetail, OrderProduct } from '../model';

export interface OrderRepository {
  save(products: OrderProduct[], address: Address, userId: string): Promise<string>
  getByUser(userId: string): Promise<Order[]>
  getById(orderId: string, userId: string): Promise<OrderDetail|null>
  setTransaction(orderId: string, transaction: string): Promise<boolean>
}