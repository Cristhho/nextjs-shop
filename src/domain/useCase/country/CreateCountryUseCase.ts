import { Country } from '../../model';
import { CountryRepository } from '../../repository/CountryRepository';

export class CreateCountryUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  execute(countries: Country[]): Promise<boolean> {
    return this.countryRepository.saveMany(countries)
  }
}