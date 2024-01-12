import { OrderRepository } from '@/domain/repository/OrderRepository';
import { OrderDataSource } from '../dataSource/OrderDataSource';
import { OrderProduct, Address, OrderDetail, Order } from '@/domain/model';

export class OrderRepositoryImpl implements OrderRepository {

  constructor(private readonly dataSource: OrderDataSource) {}

  save(products: OrderProduct[], address: Address, userId: string): Promise<string> {
    return this.dataSource.save(products, address, userId)
  }

  getByUser(userId: string): Promise<Order[]> {
    return this.dataSource.getByUser(userId)
  }

  getById(orderId: string, userId: string): Promise<OrderDetail | null> {
    return this.dataSource.getById(orderId, userId)
  }

  setTransaction(orderId: string, transaction: string): Promise<boolean> {
    return this.dataSource.setTransaction(orderId, transaction)
  }

  payOrder(orderId: string): Promise<void> {
    return this.dataSource.setPayment(orderId)
  }

}