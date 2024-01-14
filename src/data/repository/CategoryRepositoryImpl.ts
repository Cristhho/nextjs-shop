import { Category } from '@/domain/model';
import { CategoryRepository } from '@/domain/repository/CategoryRepositort';
import { CategoryDataSource } from '../dataSource/CategoryDataSource';

export class CategoryRepositoryImpl implements CategoryRepository {

  constructor(private readonly dataSource: CategoryDataSource) {}

  getByName(name: string): Promise<Category> {
    return this.dataSource.getByName(name)
  }

  getAll(): Promise<Category[]> {
    return this.dataSource.getAll()
  }

}