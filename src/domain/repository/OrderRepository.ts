import { Address, Order, OrderDetail, OrderProduct, PaginationOptions, PaginationResponse } from '../model';

export interface OrderRepository {
  save(products: OrderProduct[], address: Address, userId: string): Promise<string>
  getByUser(userId: string): Promise<Order[]>
  getById(orderId: string, userId: string, isAdmin: boolean): Promise<OrderDetail|null>
  setTransaction(orderId: string, transaction: string): Promise<boolean>
  payOrder(orderId: string): Promise<void>
  getWithPagination(options: PaginationOptions): Promise<PaginationResponse<Order>>
}