import {
  ChangeRoleUseCase,
  CreateUserUseCase,
  GetPaginatedUsersUseCase,
  GetUserByEmail,
  SaveUserUseCase
} from "@/domain/useCase";
import { diInstance } from "../CompositionRoot";

export function bindUserUseCases() {
  diInstance.bindSelf<ChangeRoleUseCase>(ChangeRoleUseCase);
  diInstance.bindSelf<CreateUserUseCase>(CreateUserUseCase);
  diInstance.bindSelf<GetPaginatedUsersUseCase>(GetPaginatedUsersUseCase);
  diInstance.bindSelf<GetUserByEmail>(GetUserByEmail);
  diInstance.bindSelf<SaveUserUseCase>(SaveUserUseCase);
}