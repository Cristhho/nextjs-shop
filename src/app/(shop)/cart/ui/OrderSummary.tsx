'use client'
import { useEffect, useState } from 'react'

import { CartSummary } from '@/domain/model'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import { diInstance } from '@/di/CompositionRoot'
import { GetCartSummaryUseCase } from '@/domain/useCase'

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const getCartSummaryUseCase = diInstance.get<GetCartSummaryUseCase>(GetCartSummaryUseCase);
  const [summary, setSummary] = useState<CartSummary>(getCartSummaryUseCase.execute())

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => useCartStore.subscribe((_) => {
    setSummary(getCartSummaryUseCase.execute())
  }), [])

  if (!loaded) {
    return (
      <></>
    )
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{summary.itemsInCart === 1 ? "1 artículo" : `${summary.itemsInCart} artículos`}</span>
      
      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(summary.subTotal)}</span>
      
      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(summary.tax)}</span>
      
      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(summary.total)}</span>
    </div>
  )
}
