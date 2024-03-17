import { inject, injectable } from 'inversify';

import { CartProduct, Product, Size } from '../../model';
import type { CartRepository } from '../../repository/CartRepository';
import { REPOSITORY_TYPES } from '@/di/repository/types';

@injectable()
export class AddProductToCartUseCase {
  
  constructor(@inject(REPOSITORY_TYPES.Cart) private readonly cartRepository: CartRepository) {}

  execute(product: Product, size: Size, quantity: number) {
    this.cartRepository.addProductToCart(this.mapToCartProduct(product, size, quantity))
  }

  private mapToCartProduct(product: Product, size: Size, quantity: number): CartProduct {
    return {
      id: product.id!,
      title: product.title,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      size,
      quantity
    }
  }
}