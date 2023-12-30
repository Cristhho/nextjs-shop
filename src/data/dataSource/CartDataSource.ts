import { CartProduct } from '@/domain/model';

export interface CartDataSource {
  addProduct(product: CartProduct): void;
}