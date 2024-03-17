import {
  CreateProductUseCase,
  DeleteImageUseCase,
  GetPaginatedProductsUseCase,
  GetProductBySlugUseCase,
  GetProductStockUseCase,
  GetProductsUseCase,
  SaveProductUseCase
} from "@/domain/useCase";
import { diInstance } from "../CompositionRoot";

export function bindProductUseCases() {
  diInstance.bindSelf<GetProductsUseCase>(GetProductsUseCase);
  diInstance.bindSelf<CreateProductUseCase>(CreateProductUseCase);
  diInstance.bindSelf<GetPaginatedProductsUseCase>(GetPaginatedProductsUseCase);
  diInstance.bindSelf<GetProductBySlugUseCase>(GetProductBySlugUseCase);
  diInstance.bindSelf<GetProductStockUseCase>(GetProductStockUseCase);
  diInstance.bindSelf<DeleteImageUseCase>(DeleteImageUseCase);
  diInstance.bindSelf<SaveProductUseCase>(SaveProductUseCase);
}
