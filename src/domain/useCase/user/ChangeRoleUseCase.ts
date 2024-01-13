import { Role } from '@/domain/model';
import { UserRepository } from '../../repository/UserRepository';

export class ChangeRoleUseCase {

  constructor(private readonly userRepository: UserRepository) {}

  execute(userId: string, role: Role) {
    return this.userRepository.changeRole(userId, role)
  }
}