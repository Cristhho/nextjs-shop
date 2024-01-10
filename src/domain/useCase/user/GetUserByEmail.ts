import { UserRepository } from '../../repository/UserRepository';

export class GetUserByEmail {

  constructor(private readonly userRepository: UserRepository) {}

  execute(email: string) {
    return this.userRepository.findByEmail(email.toLowerCase())
  }
}