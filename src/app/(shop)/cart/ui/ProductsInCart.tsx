'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ProductImage, QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import { CartProduct } from '@/domain/model';
import { currencyFormat } from '@/utils';
import { diInstance } from '@/di/CompositionRoot';
import { RemoveProductFromCartUseCase, UpdateProductQuantityUseCase } from '@/domain/useCase';

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <></>
    )
  }

  const onRemove = (product: CartProduct) => {
    diInstance.get<RemoveProductFromCartUseCase>(RemoveProductFromCartUseCase).execute(product.id, product.size)
  }

  if (productsInCart.length < 1) redirect('/empty');

  return (
    <>
      {
        productsInCart.map( product => (

          <div key={ `${product.slug}_${product.size}` } className="flex mb-5">
            <ProductImage
              src={product.image}
              width={ 100 }
              height={ 100 }
              style={{
                width: '100px',
                height: '100px'
              }}
              alt={ product.title }
              className="mr-5 rounded"
            />

            <div>
              <Link href={`/product/${product.slug}`} className='hover:underline'>
                <p>{ product.title } ({product.size})</p>
              </Link>
              <p>{ currencyFormat(product.price) }</p>
              <QuantitySelector
                quantity={ product.quantity }
                onValueChange={(qty) => diInstance.get<UpdateProductQuantityUseCase>(UpdateProductQuantityUseCase).execute(product, qty)}
              />

              <button className="underline mt-3" onClick={() => onRemove(product)}>
                Remover
              </button>
            </div>

          </div>


        ) )
      }
    </>
  )
}
