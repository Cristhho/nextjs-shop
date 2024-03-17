import { ProductDataSource } from '@/data/dataSource/ProductDataSource';
import { ProductInMemory } from '@/data/dataSource';
import { PRISMA_TYPES } from '../prisma/types';
import { diInstance } from '../CompositionRoot';

export function bindMemory() {
  diInstance.bindSingleton<ProductDataSource, ProductInMemory>(PRISMA_TYPES.Product, ProductInMemory, { targetName: 'memory' });
}
