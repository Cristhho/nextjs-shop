import { User } from '@/domain/model';

export interface UserDataSource {
  createManyProducts(users: User[]): Promise<boolean>;
}