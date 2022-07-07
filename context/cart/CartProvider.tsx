import { FC, PropsWithChildren, useReducer } from 'react';

import { ICartProduct } from '../../interfaces';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: []
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const onAddProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some((_product) => _product._id === product._id && _product.size === product.size);
    if (!productInCart) return dispatch({ type: 'Cart - Add Product', payload: [...state.cart, product] });

    const updatedProducts = state.cart.map((_product) => {
      if (_product._id !== product._id || _product.size !== product.size) return _product;

      _product.quantity += product.quantity;
      return _product;
    });

    dispatch({
      type: 'Cart - Add Product',
      payload: updatedProducts
    });
  }

  return (
    <CartContext.Provider value={{
      ...state,
      onAddProductToCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
