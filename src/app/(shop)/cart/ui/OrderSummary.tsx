'use client'
import { useEffect, useState } from 'react'

import { di } from '@/di/DependenciesLocator'
import { CartSummary } from '@/domain/model'
import { useCartStore } from '@/store'

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const [summary, setSummary] = useState<CartSummary>(di.GetCartSummaryUseCase.execute())

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => useCartStore.subscribe((state) => {
    setSummary(di.GetCartSummaryUseCase.execute())
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
      <span className="text-right">{summary.subTotal}</span>
      
      <span>Impuestos (15%)</span>
      <span className="text-right">{summary.tax}</span>
      
      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{summary.total}</span>
    </div>
  )
}
