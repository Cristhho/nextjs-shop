import { Country } from '@/domain/model';
import { CountryDataSource } from '../CountryDataSource';
import prisma from '../../../lib/prisma';

export class PrismaCountryDataSource implements CountryDataSource {

  createManyCountries(countries: Country[]): Promise<boolean> {
    return new Promise(async (res, rej) => {
      await prisma.country.createMany({
        data: countries
      });
      res(true)
    })
  }
}