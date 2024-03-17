import { inject, injectable } from 'inversify';
import type { CategoryRepository } from '../../repository/CategoryRepositort';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class GetAllCategoriesUseCase {

  constructor(@inject(REPOSITORY_TYPES.Category) private readonly categoryRepository: CategoryRepository) {}

  execute() {
    return this.categoryRepository.getAll()
  }
}