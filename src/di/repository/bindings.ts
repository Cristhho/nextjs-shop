import { ProductRepositoryImpl } from '@/data/repository';
import { diInstance } from '../DependenciesLocator';
import { REPOSITORY_TYPES } from './types';
import { PRISMA_TYPES } from '../prisma/types';
import { ProductDataSource } from '@/data/dataSource/ProductDataSource';

export function bindRepository() {
  diInstance.bindFactory<ProductRepositoryImpl>(REPOSITORY_TYPES.Product, context => {
    return (dataSourceName: string) => {
      const dataSource = context.container.getNamed<ProductDataSource>(PRISMA_TYPES.Product, dataSourceName);
      return new ProductRepositoryImpl(dataSource);
    }
  });
}
