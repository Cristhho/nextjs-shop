import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Address, CartProduct } from '@/domain/model';

interface CartState {
  cart: CartProduct[];
  address: Address

  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (_, get) => ({
      cart: [],
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        city: '',
        country: '',
        phone: ''
      },
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
