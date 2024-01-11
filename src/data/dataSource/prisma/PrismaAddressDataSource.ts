import { Address } from '@/domain/model';
import { AddressDataSource } from '../AddressDataSource';
import prisma from '@/lib/prisma';

export class PrismaAddressDataSource implements AddressDataSource {

  getByUser(userId: string): Promise<Address> {
    throw new Error('Method not implemented.');
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

}