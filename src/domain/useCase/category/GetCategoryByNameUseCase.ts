import { Category } from '../../model';
import { CategoryRepository } from '../../repository/CategoryRepositort';

export class GetCategoryByNameUseCase {

  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute(name: string): Promise<Category> {
    return this.categoryRepository.getByName(name)
  }
}