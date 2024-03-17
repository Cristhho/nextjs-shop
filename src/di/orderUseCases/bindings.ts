import {
  GetOrderByIdUseCase,
  GetPaginatedOrdersUseCase,
  GetUserOrdersUseCase,
  PayOrderUseCase,
  SaveOrderUseCase,
  SetTransactionUseCase
} from "@/domain/useCase";
import { diInstance } from "../CompositionRoot";

export function bindOrderUseCases() {
  diInstance.bindSelf<GetOrderByIdUseCase>(GetOrderByIdUseCase);
  diInstance.bindSelf<GetPaginatedOrdersUseCase>(GetPaginatedOrdersUseCase);
  diInstance.bindSelf<GetUserOrdersUseCase>(GetUserOrdersUseCase);
  diInstance.bindSelf<PayOrderUseCase>(PayOrderUseCase);
  diInstance.bindSelf<SaveOrderUseCase>(SaveOrderUseCase);
  diInstance.bindSelf<SetTransactionUseCase>(SetTransactionUseCase);
}