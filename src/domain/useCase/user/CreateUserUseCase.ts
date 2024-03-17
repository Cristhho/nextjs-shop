import { inject, injectable } from 'inversify';

import { User } from '../../model';
import type { UserRepository } from '../../repository/UserRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class CreateUserUseCase {

  constructor(@inject(REPOSITORY_TYPES.User) private readonly userRepository: UserRepository) {}

  execute(users: User[]) {
    return this.userRepository.saveMany(users)
  }
}