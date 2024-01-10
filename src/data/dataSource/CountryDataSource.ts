import { Country } from '@/domain/model';

export interface CountryDataSource {
  createManyCountries(countries: Country[]): Promise<boolean>;
  getAll(): Promise<Country[]>;
}