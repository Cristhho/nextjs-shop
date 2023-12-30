import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartProduct } from '@/domain/model';

interface CartState {
  cart: CartProduct[];

  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (_, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: "shopping-cart",
    }
  )
);
