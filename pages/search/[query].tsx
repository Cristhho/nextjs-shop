import type { NextPage, GetServerSideProps } from 'next';
import { Box, Typography } from '@mui/material';

import { MongoProductDataSource } from '@/data/dataSource/db/MongoProductDataSource';
import { ProductRepositoryImpl } from '@/data/repository/ProductRepositoryImpl';

import ShopLayout from '../../components/layouts/ShopLayout';
import { ProductsList } from '../../components/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';
import { getProducts } from '../api/products';

interface SearchPageProps {
  products: IProduct[];
  existProducts: boolean;
  query: string;
}

const SearchPage: NextPage<SearchPageProps> = ({ products, existProducts, query }) => {

  return (
    <ShopLayout
      title='TesloShop - Search'
      pageDescription='Encuentra los mejores productos para tu Teslo aquí'
    >
      <Typography variant='h1' component='h1'>Buscar productos</Typography>
      {
        existProducts
        ? <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>Término: {query}</Typography>
        : (
            <>
            <Box display='flex'>
              <Typography variant='h2' sx={{ mb: 1 }}>No se encontraron productos</Typography>
              <Typography variant='h2' sx={{ ml: 1 }} color='secondary'>{query}</Typography>
            </Box>
            <Typography variant='h1' component='h1'>Mostrando todo</Typography>
            </>
          )
      }

      <ProductsList products={products} />
    </ShopLayout>
  );
}

export const getServerSideProps:GetServerSideProps = async ({ params }) => {
  const mongoProductDataSource = new MongoProductDataSource();
  const productRepository = new ProductRepositoryImpl(mongoProductDataSource);
  const { query='' } = params as {query: string};

  if (query.length === 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    };
  }

  let products = await dbProducts.getProductByTerm(query);
  const existProducts = products.length > 0;

  if (!existProducts) {
    products = await getProducts(productRepository, 'all');
  }

  return {
    props: {
      products,
      existProducts,
      query
    }
  };
}

export default SearchPage;
