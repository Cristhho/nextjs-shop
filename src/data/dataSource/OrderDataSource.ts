import { Address, Order, OrderDetail, OrderProduct, PaginationOptions, PaginationResponse } from '@/domain/model';

export interface OrderDataSource {
  save(products: OrderProduct[], address: Address, userId: string): Promise<string>
  getById(orderId: string, userId: string, isAdmin: boolean): Promise<OrderDetail|null>
  getByUser(userId: string): Promise<Order[]>
  setTransaction(orderId: string, transaction: string): Promise<boolean>
  setPayment(orderId: string): Promise<void>
  getWithPagination(options: PaginationOptions): Promise<PaginationResponse<Order>>;
}