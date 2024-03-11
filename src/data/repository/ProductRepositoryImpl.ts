import 'reflect-metadata';
import { inject, injectable, named } from 'inversify';

import { CreateProduct, PaginationResponse, Product } from '@/domain/model';
import { ProductRepository } from '@/domain/repository/ProductRepository';
import type { ProductDataSource } from '../dataSource/ProductDataSource';
import { ProductsPaginationOptions } from '../dataSource/prisma/interfaces/PaginationOptions';
import { PRISMA_TYPES } from '@/di/prisma/types';

@injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @inject(PRISMA_TYPES.Product) private readonly dataSource: ProductDataSource
  ) {}

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

  save(product: CreateProduct): Promise<string> {
    return this.dataSource.save(product)
  }

  deleteImage(imageId: number): Promise<string> {
    return this.dataSource.deleteImage(imageId)
  }
}