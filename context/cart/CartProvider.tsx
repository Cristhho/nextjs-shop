import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { IAddress, ICartProduct } from '../../interfaces';
import { CartContext } from './CartContext';
import { cartReducer } from './cartReducer';

export interface CartState {
  cart: ICartProduct[];
  loaded: boolean;
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: IAddress;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  loaded: false,
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress: undefined
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
    try {
      const addressCookie = Cookie.get('address') ? JSON.parse(Cookie.get('address')!) : undefined ;
      dispatch({
        type: 'Cart - Load Address',
        payload: addressCookie
      });
    } catch (error) {
      dispatch({
        type: 'Cart - Load Address',
        payload: undefined
      });
    }
  }, []);

  useEffect(() => {
    if (state.loaded)
      Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.loaded, state.cart]);

  useEffect(() => {
    const subTotal = state.cart.reduce((prev, current) => prev + (current.price * current.quantity), 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
    const orderSummary = {
      numberOfItems: state.cart.reduce((prev, current) => prev + current.quantity, 0),
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (1 + taxRate)
    }
    dispatch({
      type: 'Cart - Update Summary',
      payload: orderSummary
    });
  }, [state.cart])
  
  
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

  const updateAddress = (address: IAddress) => {
    Cookie.set('address', JSON.stringify(address));
    dispatch({
      type: 'Cart - Update Address',
      payload: address
    });
  }

  return (
    <CartContext.Provider value={{
      ...state,
      onAddProductToCart,
      updateCartQuantity,
      removeCartProduct,
      updateAddress
    }}>
      {children}
    </CartContext.Provider>
  );
}
