import { Address, CartProduct, CartSummary, Size } from '@/domain/model';
import { CartRepository } from '@/domain/repository/CartRepository';
import { CartDataSource } from '../dataSource/CartDataSource';

export class CartRepositoryImpl implements CartRepository {

  constructor(private readonly dataSource: CartDataSource) {}

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

}