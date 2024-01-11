import { Address } from '../model';

export interface AddressRepository {
  getByUser(userId: string): Promise<Address>
  save(address: Address, userId: string): Promise<boolean>
  delete(userId: string): Promise<boolean>
}