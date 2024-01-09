import { CreatedUser, User } from '../model';

export interface UserRepository {
  saveMany(users: User[]): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  save(name: string, email: string, password: string): Promise<CreatedUser>;
}
