import { inject, injectable } from 'inversify';

import { OrderRepository } from '@/domain/repository/OrderRepository';
import type { OrderDataSource } from '../dataSource/OrderDataSource';
import { OrderProduct, Address, OrderDetail, Order, PaginationOptions, PaginationResponse } from '@/domain/model';
import { PRISMA_TYPES } from '@/di/prisma/types';

@injectable()
export class OrderRepositoryImpl implements OrderRepository {

  constructor(@inject(PRISMA_TYPES.Order) private readonly dataSource: OrderDataSource) {}

  save(products: OrderProduct[], address: Address, userId: string): Promise<string> {
    return this.dataSource.save(products, address, userId)
  }

  getByUser(userId: string): Promise<Order[]> {
    return this.dataSource.getByUser(userId)
  }

  getById(orderId: string, userId: string, isAdmin: boolean): Promise<OrderDetail | null> {
    return this.dataSource.getById(orderId, userId, isAdmin)
  }

  setTransaction(orderId: string, transaction: string): Promise<boolean> {
    return this.dataSource.setTransaction(orderId, transaction)
  }

  payOrder(orderId: string): Promise<void> {
    return this.dataSource.setPayment(orderId)
  }

  getWithPagination({ page = 1, take = 12,}: PaginationOptions): Promise<PaginationResponse<Order>> {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    return this.dataSource.getWithPagination({ page, take })
  }

}