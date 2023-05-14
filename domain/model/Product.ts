export interface Product {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: Type;
  gender: Gender;
  createdAt: string;
  updatedAt: string;
}

export type Size = 'XS'|'S'|'M'|'L'|'XL'|'2XL'|'3XL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';
export type Gender = 'men'|'women'|'kid'|'unisex';