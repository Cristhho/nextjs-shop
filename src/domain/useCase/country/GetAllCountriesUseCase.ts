import { CountryRepository } from '../../repository/CountryRepository';

export class GetAllCountriesUseCase {

  constructor(private readonly countryRepository: CountryRepository) {}

  execute() {
    return this.countryRepository.getAll()
  }
}