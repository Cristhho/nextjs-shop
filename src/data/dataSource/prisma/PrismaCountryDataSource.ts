import 'reflect-metadata';
import { injectable } from 'inversify';

import { Country } from '@/domain/model';
import { CountryDataSource } from '../CountryDataSource';
import prisma from '../../../lib/prisma';

@injectable()
export class PrismaCountryDataSource implements CountryDataSource {

  createManyCountries(countries: Country[]): Promise<boolean> {
    return new Promise(async (res, rej) => {
      await prisma.country.createMany({
        data: countries
      });
      res(true)
    })
  }

  async getAll(): Promise<Country[]> {
    try {
      return await prisma.country.findMany({
        orderBy: {
          name: 'asc'
        }
      })
    } catch (error) {
      console.log(error)
      return []
    }
  }
}