import { User } from '../model';
import { UserRepository } from '../repository/UserRepository';

export class CreateUserUseCase {

  constructor(private readonly userRepository: UserRepository) {}

  execute(users: User[]) {
    return this.userRepository.saveMany(users)
  }
}