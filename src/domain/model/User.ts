export interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  role: 'admin'|'user';
}

export type CreatedUser = Pick<User, 'name'|'email'|'id'>
