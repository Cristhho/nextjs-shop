import { UserRepository } from '../repository/UserRepository';

export class SaveUserUseCase {

  constructor(private readonly userRepository: UserRepository) {}

  execute(name: string, email: string, password: string) {
    return this.userRepository.save(name, email, password)
  }
}