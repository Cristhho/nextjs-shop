import { inject, injectable } from 'inversify';
import { ProductRepository } from '../../repository/ProductRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';
import { ProductRepositoryImpl } from '@/data/repository';

@injectable()
export class DeleteImageUseCase {
  private readonly productRepository: ProductRepository

  constructor(
    @inject(REPOSITORY_TYPES.Product)
    private readonly factory: (dataSourceName: string) => ProductRepositoryImpl
  ) {
    this.productRepository = this.factory('prisma');
  }

  execute(imageId: number) {
    return this.productRepository.deleteImage(imageId)
  }

}