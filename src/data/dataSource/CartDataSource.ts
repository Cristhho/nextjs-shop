import { CartProduct, Size } from '@/domain/model';

export interface CartDataSource {
  addProduct(product: CartProduct): void;
  updateProductQuantity(product: CartProduct, quantity: number): void;
  removeProduct(id: string, size: Size): void;
}