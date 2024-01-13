import { CreatedUser, PaginationOptions, PaginationResponse, Role, User } from '../model';

export interface UserRepository {
  saveMany(users: User[]): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
  save(name: string, email: string, password: string): Promise<CreatedUser>;
  getWithPagination(options: PaginationOptions): Promise<PaginationResponse<User>>
  changeRole(userId: string, role: Role): Promise<void>
}
