import { useEffect } from 'react';
import type { NextPage } from 'next';
import { Typography } from '@mui/material';

import ShopLayout from '../components/layouts/ShopLayout';
import { ProductsList } from '../components/products';
import { FullScreenLoading } from '../components/ui';
import { useProductListViewModel } from 'viewmodel/ProductListViewModel';
import { ProductRepositoryImpl } from '@/data/repository/ProductRepositoryImpl';
import { ProducApiDataSource } from '@/data/dataSource/api/ProducApiDataSource';

const productRepository = new ProductRepositoryImpl(new ProducApiDataSource());
const Home: NextPage = () => {
  const { getProducts, products, isLoading } = useProductListViewModel(productRepository);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <ShopLayout
      title='TesloShop - Home'
      pageDescription='Encuentra los mejores productos para tu Teslo aquí'
    >
      <Typography variant='h1' component='h1'>Inicio</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductsList products={products} />
      }
    </ShopLayout>
  )
}

export default Home;
