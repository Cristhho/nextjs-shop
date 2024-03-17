import { inject, injectable } from 'inversify';

import type { AddressRepository } from '@/domain/repository/AddressRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class DeleteAddressUseCase {

  constructor(@inject(REPOSITORY_TYPES.Address) private readonly addressRepository: AddressRepository) {}

  execute(userId: string) {
    return this.addressRepository.delete(userId)
  }
}