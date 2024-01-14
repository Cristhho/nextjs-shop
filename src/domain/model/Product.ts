import { ProductFormInputs } from './form/Form';

export interface Product {
  id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type?: Type;
  gender: Gender;
  ProductImage?: ProductImage[];
}

export type ProductImage = {
  id: number,
  url: string
}

export type Gender = 'men'|'women'|'kid'|'unisex';
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  image: string;
}

export interface CartSummary {
  subTotal: number;
  tax: number;
  total: number;
  itemsInCart: number;
}

export type CreateProduct = {
  id?: string|null,
  gender: string
} & Omit<ProductFormInputs, 'gender'>
