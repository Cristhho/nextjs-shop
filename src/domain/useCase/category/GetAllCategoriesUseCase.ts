import { Category } from '../../model';
import { CategoryRepository } from '../../repository/CategoryRepositort';

export class GetAllCategoriesUseCase {

  constructor(private readonly categoryRepository: CategoryRepository) {}

  execute() {
    return this.categoryRepository.getAll()
  }
}