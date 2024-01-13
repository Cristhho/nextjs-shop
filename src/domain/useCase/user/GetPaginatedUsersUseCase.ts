import { PaginationOptions } from '@/domain/model';
import { UserRepository } from '../../repository/UserRepository';

export class GetPaginatedUsersUseCase {

  constructor(private readonly userRepository: UserRepository) {}

  execute(options: PaginationOptions) {
    return this.userRepository.getWithPagination(options)
  }
}