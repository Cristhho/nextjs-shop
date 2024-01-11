import { Address } from '@/domain/model';
import { AddressRepository } from '@/domain/repository/AddressRepository';

export class SaveAddressUseCase {

  constructor(private readonly addressRepository: AddressRepository) {}

  execute(address: Address, userId: string) {
    return this.addressRepository.save(address, userId)
  }
}