import { Product } from '@/domain/model';

export interface ProductDataSource {
  getProducts(gender: string): Promise<Product[]>;
  //getProductBySlug(slug: string): Promise<Product>;
}