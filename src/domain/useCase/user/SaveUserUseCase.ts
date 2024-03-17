import { inject, injectable } from 'inversify';

import type { UserRepository } from '../../repository/UserRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class SaveUserUseCase {

  constructor(@inject(REPOSITORY_TYPES.User) private readonly userRepository: UserRepository) {}

  execute(name: string, email: string, password: string) {
    return this.userRepository.save(name, email, password)
  }
}