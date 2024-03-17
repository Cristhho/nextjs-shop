import { inject, injectable } from 'inversify';

import { UserRepository } from '@/domain/repository/UserRepository';
import type { UserDataSource } from '../dataSource/UserDataSource';
import { CreatedUser, PaginationOptions, PaginationResponse, Role, User } from '@/domain/model';
import { PRISMA_TYPES } from '@/di/prisma/types';

@injectable()
export class UserRepositoryImpl implements UserRepository {

  constructor(@inject(PRISMA_TYPES.User) private readonly dataSource: UserDataSource) {}

  saveMany(users: User[]): Promise<boolean> {
    return this.dataSource.createManyUsers(users)
  }

  findByEmail(email: string): Promise<User | null> {
    return this.dataSource.getByEmail(email)
  }

  save(name: string, email: string, password: string): Promise<CreatedUser> {
    return this.dataSource.createUser(name, email, password)
  }

  getWithPagination({ page = 1, take = 12,}: PaginationOptions): Promise<PaginationResponse<User>> {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    return this.dataSource.getWithPagination({ page, take })
  }

  changeRole(userId: string, role: Role): Promise<void> {
    return this.dataSource.changeRole(userId, role)
  }
}