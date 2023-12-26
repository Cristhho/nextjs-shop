import { Product } from '@/domain/model';
import { ProductRepository } from '@/domain/repository/ProductRepository';
import { ProductDataSource } from '../dataSource/ProductDataSource';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly dataSource: ProductDataSource) {}

  getAll(): Promise<Product[]> {
    return this.dataSource.getAllProducts()
  }

  saveMany(products: Product[]): Promise<boolean> {
    return this.dataSource.createManyProducts(products)
  }
}