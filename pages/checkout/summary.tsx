import { useContext, useEffect } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import Cookies from 'js-cookie';

import ShopLayout from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { CartContext } from '../../context';

const SummaryPage: NextPage = () => {
  const { shippingAddress, numberOfItems, createOrder } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get('address')) {
      router.push('/checkout/address');
    }
  }, [router]);

  if (!shippingAddress) {
    return <div></div>;
  }

  const onCreateOrder = () => {
    createOrder();
  }

  return (
    <ShopLayout
      title='Resumen de la orden'
      pageDescription='Resumen de la orden'
    >
      <Typography variant='h1' component='h1'>Resumen de la orden</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'})</Typography>
              <Divider sx={{my: 1}} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>
              <Typography>{shippingAddress?.name} {shippingAddress?.lastname}</Typography>
              <Typography>{shippingAddress?.address}{shippingAddress?.address2 ? `, ${shippingAddress.address2}` : ''}</Typography>
              <Typography>{shippingAddress?.city}, {shippingAddress?.zip}</Typography>
              <Typography>{shippingAddress?.country}</Typography>
              <Typography>{shippingAddress?.phone}</Typography>
              <Divider sx={{ my:1 }} />
              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{mt: 3}} display='flex' flexDirection='column'>
                <Button color='secondary' className='circular-btn' onClick={onCreateOrder}>Confirmar Orden</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export default SummaryPage;