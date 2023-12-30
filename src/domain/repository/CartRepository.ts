import { CartProduct } from '../model';

export interface CartRepository {
  addProductToCart(product: CartProduct): void
}