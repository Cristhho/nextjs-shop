import { Address, OrderProduct } from '@/domain/model';

export interface OrderDataSource {
  save(products: OrderProduct[], address: Address, userId: string): Promise<string>
}