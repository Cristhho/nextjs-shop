import { inject, injectable } from 'inversify';

import { Category } from '../../model';
import type { CategoryRepository } from '../../repository/CategoryRepositort';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class GetCategoryByNameUseCase {

  constructor(@inject(REPOSITORY_TYPES.Category) private readonly categoryRepository: CategoryRepository) {}

  execute(name: string): Promise<Category> {
    return this.categoryRepository.getByName(name)
  }
}