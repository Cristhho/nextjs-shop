import { inject, injectable } from 'inversify';

import { Address } from '@/domain/model';
import type { AddressRepository } from '@/domain/repository/AddressRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class SaveAddressUseCase {

  constructor(@inject(REPOSITORY_TYPES.Address) private readonly addressRepository: AddressRepository) {}

  execute(address: Address, userId: string) {
    return this.addressRepository.save(address, userId)
  }
}