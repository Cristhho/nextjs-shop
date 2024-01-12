import { Address, Order, OrderDetail, OrderProduct } from '@/domain/model';

export interface OrderDataSource {
  save(products: OrderProduct[], address: Address, userId: string): Promise<string>
  getById(orderId: string, userId: string): Promise<OrderDetail|null>
  getByUser(userId: string): Promise<Order[]>
}