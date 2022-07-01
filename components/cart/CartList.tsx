import { FC } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';

type CartListProps = {

}

const products = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
];

export const CartList: FC<CartListProps> = () => {
  return (
    <>
      {
        products.map((product) => (
          <Grid key={product.slug} container spacing={2} sx={{mb: 1}}>
            <Grid item xs={3}>
              <NextLink href='/product/slug' passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`products/${product.images[0]}`}
                      component='img'
                      sx={{ borderRadius: '5px' }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'>Talla {product.sizes[0]}</Typography>
                <ItemCounter />
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
              <Button variant='text' color='error'>Remover</Button>
            </Grid>
          </Grid>
        ))
      }
    </>
  )
}
