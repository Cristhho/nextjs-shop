import { Category } from '@/domain/model';

export interface CategoryDataSource {
  getByName(name: string): Promise<Category>;
  getAll(): Promise<Category[]>
}