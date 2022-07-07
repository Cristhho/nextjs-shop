import { useState } from 'react';
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';

import ShopLayout from '../../components/layouts/ShopLayout';
import { ProductSlideshow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { ICartProduct, IProduct, ISize } from '../../interfaces';
import { dbProducts } from '../../database';

type ProductPageProps = {
  product: IProduct
}

const ProductPage: NextPage<ProductPageProps> = ({ product }) => {
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1
  });

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct((currentCartProduct) => ({
      ...currentCartProduct,
      size
    }));
  }

  const onUpdateQuantity = (adding: boolean) => {
    if (adding) {
      setTempCartProduct((currentCartProduct) => ({
        ...currentCartProduct,
        quantity: currentCartProduct.quantity === product.inStock ? product.inStock : ++currentCartProduct.quantity
      }));
    } else {
      setTempCartProduct((currentCartProduct) => ({
        ...currentCartProduct,
        quantity: currentCartProduct.quantity === 1 ? 1 : --currentCartProduct.quantity
      }));
    }
  }

  return (
    <ShopLayout
      title={product.title}
      pageDescription={product.description}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>{product.title}</Typography>
            <Typography variant='subtitle1' component='h2'>${product.price}</Typography>
            <Box sx={{my: 2}}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter
                quantity={tempCartProduct.quantity}
                onUpdateQuantity={onUpdateQuantity}
                disabled={product.inStock === 0}
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={onSelectedSize}
              />
            </Box>
            
            {
              product.inStock > 0
              ? <Button color='secondary' className='circular-btn' disabled={tempCartProduct.size ? false : true}>
                  {
                    tempCartProduct.size
                    ? 'Agregar al carrito'
                    : 'Seleccione una talla'
                  }
                </Button>
              : <Chip label='No hay disponible' color='error' variant='outlined' />
            }

            <Box sx={{mt: 3}}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await dbProducts.getAllProductSlugs();

  return {
    paths: slugs.map(({slug}) => ({
      params: { slug }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps:GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}

export default ProductPage;