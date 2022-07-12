import { ICartProduct } from '../../interfaces';
import { CartState } from './CartProvider';

type Summary = {
  numberOfItems: number,
  subTotal: number,
  tax: number,
  total: number
}

type UIActionType =
|{ type: 'Cart - Load Cart', payload: ICartProduct[] }
|{ type: 'Cart - Add Product', payload: ICartProduct[] }
|{ type: 'Cart - Change Product qty', payload: ICartProduct }
|{ type: 'Cart - Remove Product', payload: ICartProduct }
|{ type: 'Cart - Update Summary', payload: Summary }

export const cartReducer = (state: CartState, action: UIActionType): CartState => {
  switch (action.type) {
    case 'Cart - Load Cart':
      return {
        ...state,
        cart: action.payload,
        loaded: true
      }
    case 'Cart - Add Product':
      return {
        ...state,
        cart: [...action.payload]
      }
    case 'Cart - Change Product qty':
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        })
      }
    case 'Cart - Remove Product':
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (product._id !== action.payload._id) return true;
          else if(product.size !== action.payload.size) return true;
          return false;
        })
      }
    case 'Cart - Update Summary':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}
