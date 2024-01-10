import { Country } from '../model';

export interface CountryRepository {
  saveMany(countries: Country[]): Promise<boolean>;
}