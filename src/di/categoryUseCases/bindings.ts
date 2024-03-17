import { GetAllCategoriesUseCase } from "@/domain/useCase";
import { diInstance } from "../CompositionRoot";

export function bindCategiryUseCases() {
  diInstance.bindSelf<GetAllCategoriesUseCase>(GetAllCategoriesUseCase);
}