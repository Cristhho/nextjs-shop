import { UserRepository } from '@/domain/repository/UserRepository';
import { UserDataSource } from '../dataSource/UserDataSource';
import { CreatedUser, User } from '@/domain/model';

export class UserRepositoryImpl implements UserRepository {

  constructor(private readonly dataSource: UserDataSource) {}

  saveMany(users: User[]): Promise<boolean> {
    return this.dataSource.createManyUsers(users)
  }

  findByEmail(email: string): Promise<User | null> {
    return this.dataSource.getByEmail(email)
  }

  save(name: string, email: string, password: string): Promise<CreatedUser> {
    return this.dataSource.createUser(name, email, password)
  }
}