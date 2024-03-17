import { inject, injectable } from 'inversify';

import { PaginationOptions } from '@/domain/model';
import type { UserRepository } from '../../repository/UserRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class GetPaginatedUsersUseCase {

  constructor(@inject(REPOSITORY_TYPES.User) private readonly userRepository: UserRepository) {}

  execute(options: PaginationOptions) {
    return this.userRepository.getWithPagination(options)
  }
}