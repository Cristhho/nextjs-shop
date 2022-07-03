import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';

import ShopLayout from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';

const SummaryPage: NextPage = () => {
  return (
    <ShopLayout
      title='Resumen de la orden'
      pageDescription='Resumen de la orden'
    >
      <Typography variant='h1' component='h1'>Resumen</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Orden</Typography>
              <Divider sx={{my: 1}} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                <NextLink href='/checkout/address' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>
              <Typography>Christian Ochoa</Typography>
              <Typography>323 Algun lugar</Typography>
              <Typography>Stittsville, HYA 23S</Typography>
              <Typography>Canadá</Typography>
              <Typography>+1 23123123</Typography>
              <Divider sx={{ my:1 }} />
              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{mt: 3}} display='flex' flexDirection='column'>
                <Button color='secondary' className='circular-btn'>Confirmar Orden</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export default SummaryPage;