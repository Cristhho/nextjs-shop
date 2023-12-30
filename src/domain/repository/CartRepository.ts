import { CartProduct } from '../model';

export interface CartRepository {
  addProductToCart(product: CartProduct): void
  updateProductQuantity(product: CartProduct, quantity: number): void
}