'use server'

import { diInstance, init } from '@/di/CompositionRoot'
import { Address } from '@/domain/model'
import { DeleteAddressUseCase, SaveDBAddressUseCase } from '@/domain/useCase'

init()

export const saveAddress = async (address: Address, userId: string) => {
  return await diInstance.get<SaveDBAddressUseCase.SaveAddressUseCase>(SaveDBAddressUseCase.SaveAddressUseCase).execute(address, userId)
}

export const deleteAddress = async (userId: string) => {
  return await diInstance.get<DeleteAddressUseCase>(DeleteAddressUseCase).execute(userId)
}
