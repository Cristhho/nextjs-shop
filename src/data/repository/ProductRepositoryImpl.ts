import { PaginationResponse, Product } from '@/domain/model';
import { ProductRepository } from '@/domain/repository/ProductRepository';
import { ProductDataSource } from '../dataSource/ProductDataSource';
import { ProductsPaginationOptions } from '../dataSource/prisma/interfaces/PaginationOptions';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private readonly dataSource: ProductDataSource) {}

  getAll(): Promise<Product[]> {
    return this.dataSource.getAllProducts()
  }

  saveMany(products: Product[]): Promise<boolean> {
    return this.dataSource.createManyProducts(products)
  }

  getWithPagination({
    page = 1,
    take = 12,
    gender
  }: ProductsPaginationOptions): Promise<PaginationResponse<Product>> {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    return this.dataSource.getWithPagination({ page, take, gender })
  }

  getBySlug(slug: string): Promise<Product|null> {
    return this.dataSource.getBySlug(slug)
  }

  getProductStock(slug: string): Promise<number> {
    return this.dataSource.getStock(slug)
  }
}