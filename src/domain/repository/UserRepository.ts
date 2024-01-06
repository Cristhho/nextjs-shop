import { User } from '../model';

export interface UserRepository {
  saveMany(users: User[]): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
}
