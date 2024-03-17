import { inject, injectable } from 'inversify';

import { Role } from '@/domain/model';
import type { UserRepository } from '../../repository/UserRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class ChangeRoleUseCase {

  constructor(@inject(REPOSITORY_TYPES.User) private readonly userRepository: UserRepository) {}

  execute(userId: string, role: Role) {
    return this.userRepository.changeRole(userId, role)
  }
}