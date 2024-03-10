import 'reflect-metadata';
import { injectable } from 'inversify';
import { Address as PrismaAddress } from '@prisma/client';

import { Address } from '@/domain/model';
import { AddressDataSource } from '../AddressDataSource';
import prisma from '@/lib/prisma';

@injectable()
export class PrismaAddressDataSource implements AddressDataSource {

  async getByUser(userId: string){
    const address = await prisma.address.findUnique({
      where: { userId }
    })
    if (!address) return null

    return this.mapToDomain(address)
  }

  async save(address: Address, userId: string): Promise<boolean> {
    try {
      await this.createOrReplaceAddress(address, userId)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async delete(userId: string): Promise<boolean> {
    try {
      await prisma.address.delete({
        where: { userId }
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  private async createOrReplaceAddress(address: Address, userId: string) {
    const storedAddress = await prisma.address.findUnique({
      where: { userId },
    });
    const addressToSave = this.mapToPrisma(address, userId)

    if (!storedAddress) {
      const newAddress = await prisma.address.create({
        data: addressToSave,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.address.update({
      where: { userId },
      data: addressToSave
    })

    return updatedAddress;
  }

  private mapToPrisma(address: Address, userId: string) {
    return {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      city: address.city,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
    }
  }

  private mapToDomain(address: PrismaAddress): Address {
    const { countryId, userId, id, address2, ...rest } = address
    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : ''
    }
  }

}