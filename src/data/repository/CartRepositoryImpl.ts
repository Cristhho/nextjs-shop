import { CartProduct, Size } from '@/domain/model';
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

}