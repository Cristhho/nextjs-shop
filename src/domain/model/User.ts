export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  role: Role;
}

export type Role = 'admin'|'user';

export type CreatedUser = Pick<User, 'name'|'email'|'id'>
