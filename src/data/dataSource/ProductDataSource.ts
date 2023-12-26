import { Product } from '@/domain/model';

export interface ProductDataSource {
  getAllProducts(): Promise<Product[]>;
  createManyProducts(products: Product[]): Promise<boolean>;
}