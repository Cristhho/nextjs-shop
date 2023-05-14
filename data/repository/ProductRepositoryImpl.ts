import { Product } from '@/domain/model';
import { ProductRepository } from '@/domain/repository';
import { ProductDataSource } from '../dataSource/ProductDataSource';

export class ProductRepositoryImpl implements ProductRepository {
  private dataSource: ProductDataSource;

  constructor(dataSource: ProductDataSource) {
    this.dataSource = dataSource;
  }

  get(gender: string): Promise<Product[]> {
    return this.dataSource.getProducts(gender);
  }

  /*async getProductBySlug(slug: string): Promise<Product> {
    return ;
  }

  async getAllProductsSlugs(): Promise<string[]> {
    return [];
  }

  async getProductsBySearch(term: string): Promise<Product[]> {
    return [];
  }*/
}