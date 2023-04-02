import { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { Box, Card, CardContent, Chip, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { PayPalButtons } from '@paypal/react-paypal-js';

import ShopLayout from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { tesloApi } from '../../api';

type OrderResponseBody = {
  id: string;
  status:
    | "CREATED"
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
};

type Props = {
  order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const [paying, setPaying] = useState(false);
  const router = useRouter();

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== 'COMPLETED') {
      return alert('No hay pago en paypal');
    }
    setPaying(true);

    try {
      await tesloApi.post('/orders/pay', {
        transactionid: details.id,
        orderId: order._id
      });

      router.reload();
    } catch (error) {
      console.log(error);
      setPaying(false);
    }
  }

  return (
    <ShopLayout
      title='Resumen de la orden'
      pageDescription='Resumen de la orden'
    >
      <Typography variant='h1' component='h1'>Orden {order._id}</Typography>
      {
        order.isPaid ? (
          <Chip
            sx={{my: 2}}
            label='Pagada'
            variant='outlined'
            color='success'
            icon={<CreditScoreOutlined />}
          />
        ) : (
          <Chip
            sx={{my: 2}}
            label='Pendiente de pago'
            variant='outlined'
            color='error'
            icon={<CreditCardOffOutlined />}
          />
        )
      }
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ({order.numberOfItems} producto{order.numberOfItems > 1 && 's'})</Typography>
              <Divider sx={{my: 1}} />
              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
              </Box>
              <Typography>{order.shippingAddress.name} {order.shippingAddress.lastname}</Typography>
              <Typography>{order.shippingAddress.address}</Typography>
              <Typography>{order.shippingAddress.address2}</Typography>
              <Typography>{order.shippingAddress.city}, {order.shippingAddress.country}</Typography>
              <Typography>{order.shippingAddress.zip}</Typography>
              <Typography>{order.shippingAddress.phone}</Typography>
              <Divider sx={{ my:1 }} />
              <OrderSummary summary={{
                numberOfItems: order.numberOfItems,
                subTotal: order.subTotal,
                tax: order.tax,
                total: order.total
              }} />
              <Box sx={{mt: 3}}>
                <Box
                  display='flex'
                  justifyContent='center'
                  className='fadeIn'
                  sx={{
                    display: paying ? 'flex' : 'none'
                  }}
                >
                  <CircularProgress />
                </Box>
                <Box sx={{ display: paying ? 'none' : 'block' }}>
                  {
                    order.isPaid ? (
                      <Chip
                        sx={{my: 2}}
                        label='Pagada'
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined />}
                      />
                    ) : (
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: `${order.total}`,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order!.capture().then((details) => {
                            onOrderCompleted(details);
                          });
                        }}
                      />
                    )
                  }
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export const getServerSideProps:GetServerSideProps = async ({ req, query }) => {
  const {id = ''} = query;
  const session: any = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false
      }
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: '/orders',
        permanent: false
      }
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: '/orders',
        permanent: false
      }
    };
  }

  return {
    props: {
      order
    }
  }
}

export default OrderPage;