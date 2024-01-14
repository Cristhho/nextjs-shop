import { CreateProduct, PaginationResponse, Product } from '@/domain/model';
import { ProductsPaginationOptions } from './prisma/interfaces/PaginationOptions';

export interface ProductDataSource {
  getAllProducts(): Promise<Product[]>;
  createManyProducts(products: Product[]): Promise<boolean>;
  getWithPagination(options: ProductsPaginationOptions): Promise<PaginationResponse<Product>>;
  getBySlug(slug: string): Promise<Product|null>;
  getStock(slug: string): Promise<number>;
  save(product: CreateProduct): Promise<string>
}