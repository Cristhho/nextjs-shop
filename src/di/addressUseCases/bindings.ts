import {
  DeleteAddressUseCase,
  GetAddressUseCase,
  SaveDBAddressUseCase
} from "@/domain/useCase";
import { diInstance } from "../CompositionRoot";

export function bindAddressUseCases() {
  diInstance.bindSelf<DeleteAddressUseCase>(DeleteAddressUseCase);
  diInstance.bindSelf<GetAddressUseCase>(GetAddressUseCase);
  diInstance.bindSelf<SaveDBAddressUseCase.SaveAddressUseCase>(SaveDBAddressUseCase.SaveAddressUseCase);
}