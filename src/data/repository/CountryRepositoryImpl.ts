import { CountryRepository } from '@/domain/repository/CountryRepository';
import { CountryDataSource } from '../dataSource/CountryDataSource';
import { Country } from '@/domain/model';

export class CountryRepositoryImpl implements CountryRepository {

  constructor(private readonly dataSource: CountryDataSource) {}

  saveMany(countries: Country[]): Promise<boolean> {
    return this.dataSource.createManyCountries(countries)
  }
}