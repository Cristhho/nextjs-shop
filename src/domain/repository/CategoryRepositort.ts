import { Category } from '../model';

export interface CategoryRepository {
  getByName(name: string): Promise<Category>;
  getAll(): Promise<Category[]>
}