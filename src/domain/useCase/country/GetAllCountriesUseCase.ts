import { inject, injectable } from 'inversify';
import type { CountryRepository } from '../../repository/CountryRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class GetAllCountriesUseCase {

  constructor(@inject(REPOSITORY_TYPES.Country) private readonly countryRepository: CountryRepository) {}

  execute() {
    return this.countryRepository.getAll()
  }
}