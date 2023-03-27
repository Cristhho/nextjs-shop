import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';
import { getSession } from 'next-auth/react';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import ShopLayout from '../../components/layouts/ShopLayout';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

const columns: GridColDef<IOrder>[] = [
  { field: '_id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 400, renderCell(params) {
    return (
      <Typography>{params.row.shippingAddress.name} {params.row.shippingAddress.lastname}</Typography>
    );
  }, },
  {
    field: 'isPaid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 150,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.isPaid ? (
        <Chip color='success' label='Pagada' variant='outlined' />
      ) : (
        <Chip color='error' label='No pagada' variant='outlined' />
      );
    },
  },
  {
    field: 'orden',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row._id}`} passHref>
          <Link underline='always'>Ver orden</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: 'Fernando Herrera' },
  { id: 2, paid: false, fullname: 'Melissa Flores' },
  { id: 3, paid: true, fullname: 'Hernando Vallejo' },
  { id: 4, paid: false, fullname: 'Emin Reyes' },
  { id: 5, paid: false, fullname: 'Eduardo Rios' },
  { id: 6, paid: true, fullname: 'Natalia Herrera' },
];

type Props = {
  orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  return (
    <ShopLayout
      title='Historial de ordenes'
      pageDescription='Historial de ordenes del cliente'
    >
      <Typography variant='h1' component='h1'>
        Historial de ordenes
      </Typography>
      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid<IOrder>
            rows={orders}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25]}
            getRowId={(row) => row._id!}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps:GetServerSideProps = async ({ req }) =>  {
  const session: any = await getSession({req});

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders`,
        permanent: false
      }
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders
    }
  };
}

export default HistoryPage;
