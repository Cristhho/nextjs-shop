import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

import { ItemCounter } from '../ui';
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';

type CartListProps = {
  editable?: boolean
}

export const CartList: FC<CartListProps> = ({ editable = false }) => {
  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const onNewCartQuantity = (product: ICartProduct, adding: boolean) => {
    if (!adding && product.quantity === 1) removeCartProduct(product);
    product.quantity = adding ? ++product.quantity : --product.quantity;
    updateCartQuantity(product);
  }

  return (
    <>
      {
        cart.map((product) => (
          <Grid key={product.slug + product.size} container spacing={2} sx={{mb: 1}}>
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.image}`}
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
                <Typography variant='body1'>Talla: <b>{product.size}</b></Typography>
                {
                  editable
                  ? <ItemCounter quantity={product.quantity} onUpdateQuantity={(adding) => onNewCartQuantity(product, adding)} />
                  : <Typography variant='h5'>{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                }
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>{`$${product.price * product.quantity}`}</Typography>
              {
                editable && (
                  <Button variant='text' color='error' onClick={() => removeCartProduct(product)}>Remover</Button>
                )
              }
            </Grid>
          </Grid>
        ))
      }
    </>
  )
}
