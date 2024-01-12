import { Address, CartProduct, CartSummary } from '../model';

export interface CartRepository {
  addProductToCart(product: CartProduct): void
  updateProductQuantity(product: CartProduct, quantity: number): void
  removeProduct(id: CartProduct['id'], size: CartProduct['size']): void
  getSummary(): CartSummary
  saveAddress(address: Address): void
  clearCart(): void
}