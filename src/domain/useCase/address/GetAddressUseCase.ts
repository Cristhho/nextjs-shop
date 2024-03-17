import { inject, injectable } from 'inversify';

import { REPOSITORY_TYPES } from '@/di/repository/types';
import type { AddressRepository } from '@/domain/repository/AddressRepository';

@injectable()
export class GetAddressUseCase {

  constructor(@inject(REPOSITORY_TYPES.Address) private readonly addressRepository: AddressRepository) {}

  execute(userId: string) {
    return this.addressRepository.getByUser(userId)
  }
}