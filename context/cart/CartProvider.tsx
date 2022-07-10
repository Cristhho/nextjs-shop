import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct } from '../../interfaces';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';

export interface CartState {
  cart: ICartProduct[];
  loaded: boolean;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  loaded: false
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const cartCookie = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [] ;
      dispatch({
        type: 'Cart - Load Cart',
        payload: cartCookie
      });
    } catch (error) {
      dispatch({
        type: 'Cart - Load Cart',
        payload: []
      });
    }
  }, []);

  useEffect(() => {
    if (state.loaded)
      Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.loaded, state.cart])
  
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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({
      type: 'Cart - Change Product qty',
      payload: product
    });
  }

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({
      type: 'Cart - Remove Product',
      payload: product
    });
  }

  return (
    <CartContext.Provider value={{
      ...state,
      onAddProductToCart,
      updateCartQuantity,
      removeCartProduct
    }}>
      {children}
    </CartContext.Provider>
  );
}
