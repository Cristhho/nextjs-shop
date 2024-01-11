import { Address } from '@/domain/model';
import { AddressRepository } from '@/domain/repository/AddressRepository';
import { AddressDataSource } from '../dataSource/AddressDataSource';

export class AddressRepositoryImpl implements AddressRepository {

  constructor(private readonly dataSource: AddressDataSource) {}

  getByUser(userId: string) {
    return this.dataSource.getByUser(userId)
  }

  save(address: Address, userId: string): Promise<boolean> {
    return this.dataSource.save(address, userId)
  }

  delete(userId: string): Promise<boolean> {
    return this.dataSource.delete(userId)
  }

}