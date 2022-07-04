import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';

import ShopLayout from '../../components/layouts/ShopLayout';
import { ProductsList } from '../../components/products';

import { db } from '../../database';
import { IProduct } from '../../interfaces';
import { Product } from '../../models';

interface CategoryPageProps {
  products: IProduct[];
  title: string;
  description: string;
}

const CategoryPage: NextPage<CategoryPageProps> = ({ title, description, products }) => {
  const router = useRouter();
  
  return (
    <ShopLayout
      title={title}
      pageDescription={description}
    >
      <Typography variant='h1' component='h1'>{router.query.gender}</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>{`Productos para ${router.query.gender}`}</Typography>

      <ProductsList products={products} />
    </ShopLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{params:{gender:'men'}},{params:{gender:'women'}},{params:{gender:'kid'}}],
    fallback: false
  }
}

export const getStaticProps:GetStaticProps = async ({ params }) => {
  const { gender } = params as {gender: string};

  const products = await getData(gender);

  return {
    props:{
      products,
      title: `Teslo-shop ${gender}`,
      description: `Productos de la categoría ${gender}`
    },
    revalidate:86400,
  }
}

const getData = async (url: string) =>{
 
  await db.connect();
  const findProduct = await Product.find({gender: url}).select('title images price inStock slug -_id').lean();
  await db.disconnect();

  return findProduct;
}

export default CategoryPage;