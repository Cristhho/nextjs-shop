import { CartProduct, Product, Size } from '../model';
import { CartRepository } from '../repository/CartRepository';

export class AddProductToCartUseCase {
  
  constructor(private readonly cartRepository: CartRepository) {}

  execute(product: Product, size: Size, quantity: number) {
    return this.cartRepository.addProductToCart(this.mapToCartProduct(product, size, quantity))
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