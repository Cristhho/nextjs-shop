import { ICartProduct } from '../../interfaces';
import { CartState } from './CartProvider';

type UIActionType =
|{ type: 'Cart - Load Cart', payload: ICartProduct[] }
|{ type: 'Cart - Add Product', payload: ICartProduct[] }

export const cartReducer = (state: CartState, action: UIActionType): CartState => {
  switch (action.type) {
    case 'Cart - Load Cart':
      return {
        ...state
      }
    case 'Cart - Add Product':
      return {
        ...state,
        cart: [...action.payload]
      }
    default:
      return state;
  }
}
