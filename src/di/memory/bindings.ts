import { ProductDataSource } from '@/data/dataSource/ProductDataSource';
import { diInstance } from '../DependenciesLocator';
import { ProductInMemory } from '@/data/dataSource';
import { MEMORY_TYPES } from './types';

export function bindMemory() {
  diInstance.bindSingleton<ProductDataSource, ProductInMemory>(MEMORY_TYPES.Product, ProductInMemory);
}
