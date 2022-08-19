import { useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';

import ShopLayout from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';

const CartPage: NextPage = () => {
  const { loaded, cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (loaded && cart.length === 0) {
      router.replace('/cart/empty');
    }
  }, [loaded, cart, router]);
  
  if (!loaded || cart.length === 0) return <></>;

  return (
    <ShopLayout
      title='Carrito'
      pageDescription='Carrito de compras'
    >
      <Typography variant='h1' component='h1'>Carrito</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Orden</Typography>
              <Divider sx={{my: 1}} />
              <OrderSummary />
              <Box sx={{mt: 3}} display='flex' flexDirection='column'>
                <Button color='secondary' className='circular-btn'>Checkout</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export default CartPage;