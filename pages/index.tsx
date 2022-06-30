import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';

import ShopLayout from '../components/layouts/ShopLayout';
import { initialData } from '../database/products';

const Home: NextPage = () => {
  return (
    <ShopLayout
      title='TesloShop - Home'
      pageDescription='Encuentra los mejores productos para tu Teslo aquí'
    >
      <Typography variant='h1' component='h1'>Inicio</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

      <Grid container spacing={4}>
        {
          initialData.products.map((product) => (
            <Grid key={product.slug} item xs={6} sm={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    image={`products/${product.images[0]}`}
                    alt={product.title}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </ShopLayout>
  )
}

export default Home
