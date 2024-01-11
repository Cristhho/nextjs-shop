import { AddressRepository } from '@/domain/repository/AddressRepository';

export class DeleteAddressUseCase {

  constructor(private readonly addressRepository: AddressRepository) {}

  execute(userId: string) {
    return this.addressRepository.delete(userId)
  }
}