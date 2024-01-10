import { Country } from '../model';

export interface CountryRepository {
  saveMany(countries: Country[]): Promise<boolean>;
  getAll(): Promise<Country[]>;
}