import { inject, injectable } from 'inversify';

import { Address } from '@/domain/model';
import { AddressRepository } from '@/domain/repository/AddressRepository';
import type { AddressDataSource } from '../dataSource/AddressDataSource';
import { PRISMA_TYPES } from '@/di/prisma/types';

@injectable()
export class AddressRepositoryImpl implements AddressRepository {

  constructor(@inject(PRISMA_TYPES.Address) private readonly dataSource: AddressDataSource) {}

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