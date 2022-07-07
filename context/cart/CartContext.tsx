import { createContext } from 'react';

import { ICartProduct } from '../../interfaces';

interface ContextProps {
  cart: ICartProduct[];
  onAddProductToCart: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
