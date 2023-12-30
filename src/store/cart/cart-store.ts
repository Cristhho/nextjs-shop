import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartProduct } from '@/domain/model';

interface CartState {
  cart: CartProduct[];
}

export const useCartStore = create<CartState>()(
  persist<CartState>(
    () => ({
      cart: []
    }),
    {
      name: "shopping-cart",
    }
  )
);
