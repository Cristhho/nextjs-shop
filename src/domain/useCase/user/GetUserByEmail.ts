import { inject, injectable } from 'inversify';

import type { UserRepository } from '../../repository/UserRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class GetUserByEmail {

  constructor(@inject(REPOSITORY_TYPES.User) private readonly userRepository: UserRepository) {}

  execute(email: string) {
    return this.userRepository.findByEmail(email.toLowerCase())
  }
}