import { inject, injectable } from 'inversify';

import { Address, CartProduct, Size } from '@/domain/model';
import { CartRepository } from '@/domain/repository/CartRepository';
import type { CartDataSource } from '../dataSource/CartDataSource';
import { ZUSTAND_TYPES } from '@/di/zustand/types';

@injectable()
export class CartRepositoryImpl implements CartRepository {

  constructor(@inject(ZUSTAND_TYPES.Cart) private readonly dataSource: CartDataSource) {}

  addProductToCart(product: CartProduct) {
    this.dataSource.addProduct(product)
  }

  updateProductQuantity(product: CartProduct, quantity: number) {
    this.dataSource.updateProductQuantity(product, quantity)
  }

  removeProduct(id: string, size: Size) {
    this.dataSource.removeProduct(id, size)
  }

  getSummary() {
    return this.dataSource.summary()
  }

  saveAddress(address: Address) {
    this.dataSource.saveAddress(address)
  }

  clearCart(): void {
    this.dataSource.clear()
  }

}