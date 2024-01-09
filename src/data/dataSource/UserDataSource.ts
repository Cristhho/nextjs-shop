import { CreatedUser, User } from '@/domain/model';

export interface UserDataSource {
  createManyUsers(users: User[]): Promise<boolean>;
  getByEmail(email: string): Promise<User | null>;
  createUser(name: string, email: string, password: string): Promise<CreatedUser>;
}