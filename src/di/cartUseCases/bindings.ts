import {
  AddProductToCartUseCase,
  ClearCartUseCase,
  GetCartSummaryUseCase,
  RemoveProductFromCartUseCase,
  SaveAddressUseCase,
  UpdateProductQuantityUseCase
} from "@/domain/useCase";
import { diInstance } from "../CompositionRoot";

export function bindCartUseCases() {
  diInstance.bindSelf<AddProductToCartUseCase>(AddProductToCartUseCase);
  diInstance.bindSelf<ClearCartUseCase>(ClearCartUseCase);
  diInstance.bindSelf<GetCartSummaryUseCase>(GetCartSummaryUseCase);
  diInstance.bindSelf<RemoveProductFromCartUseCase>(RemoveProductFromCartUseCase);
  diInstance.bindSelf<SaveAddressUseCase>(SaveAddressUseCase);
  diInstance.bindSelf<UpdateProductQuantityUseCase>(UpdateProductQuantityUseCase);
}