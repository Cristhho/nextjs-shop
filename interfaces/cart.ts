import { ISize } from "./products";

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  size?: ISize;
  slug: string;
  title: string;
  gender: 'men'|'women'|'kid'|'unisex',
  quantity: number;
}

export interface IAddress {
  name: string;
  lastname: string;
  address: string;
  address2: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}
