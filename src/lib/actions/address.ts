'use server'

import { di } from '@/di/DependenciesLocator'
import { Address } from '@/domain/model'

export const saveAddress = async (address: Address, userId: string) => {
  return await di.SaveDBAddressUseCase.execute(address, userId)
}
