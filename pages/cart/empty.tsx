import { NextPage } from 'next';
import NextLink from 'next/link';
import { Box, Link, Typography } from '@mui/material';

import ShopLayout from '../../components/layouts/ShopLayout';
import { RemoveShoppingCartOutlined } from '@mui/icons-material';

const Empty: NextPage = () => {
  return (
    <ShopLayout
      title='Carrito vacio'
      pageDescription='No hay articulos en el carrito de compras'
    >
      <Box
        display='flex'
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography>Su carrito está vacio</Typography>
          <NextLink href='/' passHref>
            <Link typography='h4' color='secondary'>Regresar</Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
}

export default Empty;