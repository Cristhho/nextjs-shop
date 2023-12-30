'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import { di } from '@/di/DependenciesLocator';
import { CartProduct } from '@/domain/model';

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
    di.RemoveProductFromCartUseCase.execute(product.id, product.size)
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
              <Link href={`/product/${product.slug}`} className='hover:underline'>
                <p>{ product.title } ({product.size})</p>
              </Link>
              <p>${ product.price }</p>
              <QuantitySelector
                quantity={ product.quantity }
                onValueChange={(qty) => di.UpdateProductQuantityUseCase.execute(product, qty)}
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
