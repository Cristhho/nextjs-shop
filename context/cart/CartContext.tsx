import { createContext } from 'react';

import { IAddress, ICartProduct } from '../../interfaces';

interface ContextProps {
  cart: ICartProduct[];
  loaded: boolean;
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?: IAddress;
  onAddProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (address: IAddress) => void;
  createOrder: () => Promise<{hasError: boolean, message: string}>;
}

export const CartContext = createContext({} as ContextProps);
