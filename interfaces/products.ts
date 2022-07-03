export interface IProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISize[];
  slug: string;
  tags: string[];
  title: string;
  type: IType;
  gender: 'men'|'women'|'kid'|'unisex'
}

export type ISize = 'XS'|'S'|'M'|'L'|'XL'|'2XL'|'3XL';
export type IType = 'shirts'|'pants'|'hoodies'|'hats';