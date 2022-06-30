import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';

import ShopLayout from '../components/layouts/ShopLayout';
import { ProductsList } from '../components/products';
import { initialData } from '../database/products';

const Home: NextPage = () => {
  return (
    <ShopLayout
      title='TesloShop - Home'
      pageDescription='Encuentra los mejores productos para tu Teslo aquí'
    >
      <Typography variant='h1' component='h1'>Inicio</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

      <ProductsList products={initialData.products as any[]} />
    </ShopLayout>
  )
}

export default Home
