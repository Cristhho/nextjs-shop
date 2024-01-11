'use server'

import { di } from '@/di/DependenciesLocator'
import { Address } from '@/domain/model'

export const saveAddress = async (address: Address, userId: string) => {
  return await di.SaveDBAddressUseCase.execute(address, userId)
}

export const deleteAddress = async (userId: string) => {
  return await di.DeleteAddressUseCase.execute(userId)
}
