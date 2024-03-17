import { CreateCountryUseCase, GetAllCountriesUseCase } from "@/domain/useCase";
import { diInstance } from "../CompositionRoot";

export function bindCountryUseCases() {
  diInstance.bindSelf<CreateCountryUseCase>(CreateCountryUseCase);
  diInstance.bindSelf<GetAllCountriesUseCase>(GetAllCountriesUseCase);
}