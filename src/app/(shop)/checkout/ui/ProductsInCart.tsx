'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

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

  return (
    <>
      {
        productsInCart.map( product => (

          <div key={ `${product.slug}_${product.size}` } className="flex mb-5">
            <Image
              src={ `/products/${ product.image }` }
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
              <span>
                { product.title } ({product.size})
              </span>
              <p>{ currencyFormat(product.price) } x {product.quantity}</p>
              <div className="w-full h-0.5 rounded bg-gray-200" />
              <p className='font-bold'>{ currencyFormat(product.price * product.quantity) }</p>
            </div>

          </div>


        ) )
      }
    </>
  )
}
