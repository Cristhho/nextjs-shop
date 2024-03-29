import { Address } from '@/domain/model';

export interface AddressDataSource {
  getByUser(userId: string): Promise<Address|null>
  save(address: Address, userId: string): Promise<boolean>
  delete(userId: string): Promise<boolean>
}