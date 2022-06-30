import { FC } from 'react';
import { Grid } from '@mui/material';

import { IProduct } from '../../interfaces';
import { ProductCard } from './ProductCard';

type ProductsListProps = {
  products: IProduct[]
}

export const ProductsList:FC<ProductsListProps> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {
        products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
          />
        ))
      }
    </Grid>
  );
}
