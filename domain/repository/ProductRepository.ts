import { Product } from '../model';

export interface ProductRepository {
  get(gender: string): Promise<Product[]>;
  /*getProductBySlug(slug: string): Promise<Product>;
  getAllProductsSlugs(): Promise<string[]>;
  getProductsBySearch(term: string): Promise<Product[]>;*/
}