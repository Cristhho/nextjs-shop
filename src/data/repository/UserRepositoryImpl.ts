import { UserRepository } from '@/domain/repository/UserRepository';
import { UserDataSource } from '../dataSource/UserDataSource';
import { User } from '@/domain/model';

export class UserRepositoryImpl implements UserRepository {

  constructor(private readonly dataSource: UserDataSource) {}

  saveMany(users: User[]): Promise<boolean> {
    return this.dataSource.createManyProducts(users)
  }

  findByEmail(email: string): Promise<User | null> {
      return this.dataSource.getByEmail(email)
  }
}