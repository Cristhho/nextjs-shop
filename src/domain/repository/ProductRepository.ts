import { CreateProduct, PaginationOptions, PaginationResponse, Product } from '../model';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
  saveMany(products: Product[]): Promise<boolean>;
  getWithPagination(options: PaginationOptions): Promise<PaginationResponse<Product>>
  getBySlug(slug: string): Promise<Product|null>;
  getProductStock(slug: string): Promise<number>;
  save(product: CreateProduct): Promise<string>;
  deleteImage(imageId: number): Promise<string>;
}
