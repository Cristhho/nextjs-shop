import { OrderRepository } from '@/domain/repository/OrderRepository';
import { OrderDataSource } from '../dataSource/OrderDataSource';
import { OrderProduct, Address, OrderDetail } from '@/domain/model';

export class OrderRepositoryImpl implements OrderRepository {

  constructor(private readonly dataSource: OrderDataSource) {}

  save(products: OrderProduct[], address: Address, userId: string): Promise<string> {
    return this.dataSource.save(products, address, userId)
  }

  getByUser(userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getById(orderId: string, userId: string): Promise<OrderDetail | null> {
    return this.dataSource.getById(orderId, userId)
  }

}