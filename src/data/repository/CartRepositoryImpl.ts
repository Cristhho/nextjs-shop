import { CartProduct } from '@/domain/model';
import { CartRepository } from '@/domain/repository/CartRepository';
import { CartDataSource } from '../dataSource/CartDataSource';

export class CartRepositoryImpl implements CartRepository {

  constructor(private readonly dataSource: CartDataSource) {}

  addProductToCart(product: CartProduct): void {
    return this.dataSource.addProduct(product)
  }

}