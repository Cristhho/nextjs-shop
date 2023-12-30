import { CartProduct, Size } from '@/domain/model';
import { useCartStore } from '@/store';
import { CartDataSource } from '../CartDataSource';

export class ZustandCartDataSource implements CartDataSource {

  addProduct(product: CartProduct): void {
    useCartStore.setState((state) => {
      const { cart } = state
      const productInCart = cart.some(
        (item) => item.id === product.id && item.size === product.size
      )
  
      if (!productInCart) {
        return { cart: [...cart, product] }
      }
  
      const updatedCartProducts = cart.map((item) => {
        if (item.id === product.id && item.size === product.size) {
          return { ...item, quantity: item.quantity + product.quantity };
        }
  
        return item;
      });
      return { cart: updatedCartProducts }
    })
  }

  updateProductQuantity(product: CartProduct, quantity: number) {
    useCartStore.setState((state) => {
      const { cart } = state
      const updatedCartProducts = cart.map((item) => {
        if (item.id === product.id && item.size === product.size) {
          return { ...item, quantity: quantity };
        }
  
        return item;
      });

      return { cart: updatedCartProducts }
    })
  }

  removeProduct(id: string, size: Size) {
    useCartStore.setState((state) => {
      const { cart } = state
      const updatedCartProducts = cart.filter((item) => item.id !== id || item.size !== size)
      return { cart: updatedCartProducts }
    })
  }

}