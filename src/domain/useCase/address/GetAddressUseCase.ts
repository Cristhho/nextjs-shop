import { AddressRepository } from '@/domain/repository/AddressRepository';

export class GetAddressUseCase {

  constructor(private readonly addressRepository: AddressRepository) {}

  execute(userId: string) {
    return this.addressRepository.getByUser(userId)
  }
}