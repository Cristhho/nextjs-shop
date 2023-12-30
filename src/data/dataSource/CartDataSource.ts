import { CartProduct } from '@/domain/model';

export interface CartDataSource {
  addProduct(product: CartProduct): void;
  updateProductQuantity(product: CartProduct, quantity: number): void
}