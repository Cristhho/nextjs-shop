import { Address } from './Address';
import { Size } from './Product';

export interface OrderProduct {
  id: string;
  quantity: number;
  size: Size
}

export interface OrderHeader {
  itemsInOrder: number;
  subTotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
}

export interface OrderItem {
  title: string;
  slug: string;
  quantity: number;
  price: number;
  size: Size;
  image: string;
}

export interface OrderDetail {
  header: OrderHeader;
  address: Address;
  items: OrderItem[]
}
