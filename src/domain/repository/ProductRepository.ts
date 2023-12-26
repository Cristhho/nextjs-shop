import { Product } from '../model';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  saveMany(products: Product[]): Promise<boolean>;
}
