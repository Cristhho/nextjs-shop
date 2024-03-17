import { Category } from '@/domain/model';
import { CategoryRepository } from '@/domain/repository/CategoryRepositort';
import type { CategoryDataSource } from '../dataSource/CategoryDataSource';
import { inject, injectable } from 'inversify';
import { PRISMA_TYPES } from '@/di/prisma/types';

@injectable()
export class CategoryRepositoryImpl implements CategoryRepository {

  constructor(@inject(PRISMA_TYPES.Category) private readonly dataSource: CategoryDataSource) {}

  getByName(name: string): Promise<Category> {
    return this.dataSource.getByName(name)
  }

  getAll(): Promise<Category[]> {
    return this.dataSource.getAll()
  }

}