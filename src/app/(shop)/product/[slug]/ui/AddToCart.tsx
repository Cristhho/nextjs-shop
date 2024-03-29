'use client'
import { useState } from 'react';

import { QuantitySelector, SizeSelector } from '@/components';
import { Product, Size } from '@/domain/model';
import { diInstance } from '@/di/CompositionRoot';
import { AddProductToCartUseCase } from '@/domain/useCase';

type Props = {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size|undefined>()
  const [qty, setQty] = useState(1)
  const [posted, setPosted] = useState(false)

  const addToCart = () => {
    setPosted(true)
    if (!size) return

    diInstance.get<AddProductToCartUseCase>(AddProductToCartUseCase).execute(product, size, qty)
    setPosted(false);
    setQty(1);
    setSize(undefined);
  }

  return (
    <>
      {
        (posted && !size) && (
          <span className='mt-2 text-red-500'>Debe seleccionar una talla</span>
        )
      }
      {/* Selector de Tallas */ }
      <SizeSelector
        selectedSize={ size }
        availableSizes={ product.sizes }
        onSizeChange={(size) => setSize(size)}
      />


      {/* Selector de Cantidad */ }
      <QuantitySelector
        quantity={ qty }
        onValueChange={(qty) => setQty(qty)}
      />


      {/* Button */ }
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  )
}
