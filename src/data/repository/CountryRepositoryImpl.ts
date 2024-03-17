import { inject, injectable } from 'inversify';

import { CountryRepository } from '@/domain/repository/CountryRepository';
import type { CountryDataSource } from '../dataSource/CountryDataSource';
import { Country } from '@/domain/model';
import { PRISMA_TYPES } from '@/di/prisma/types';

@injectable()
export class CountryRepositoryImpl implements CountryRepository {

  constructor(@inject(PRISMA_TYPES.Country) private readonly dataSource: CountryDataSource) {}

  saveMany(countries: Country[]): Promise<boolean> {
    return this.dataSource.createManyCountries(countries)
  }

  getAll(): Promise<Country[]> {
    return this.dataSource.getAll()
  }
}