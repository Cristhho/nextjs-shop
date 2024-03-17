import { inject, injectable } from 'inversify';

import { Country } from '../../model';
import type { CountryRepository } from '../../repository/CountryRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class CreateCountryUseCase {
  constructor(@inject(REPOSITORY_TYPES.Country) private readonly countryRepository: CountryRepository) {}

  execute(countries: Country[]): Promise<boolean> {
    return this.countryRepository.saveMany(countries)
  }
}