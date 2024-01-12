'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { useCartStore } from '@/store';
import { di } from '@/di/DependenciesLocator';
import { currencyFormat } from '@/utils';
import { OrderProduct } from '@/domain/model';
import { placeOrder } from '@/lib/actions';

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false)
  const [savingOrder, setSavingOrder] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter()
  const address = useCartStore((state) => state.address)
  const productsInCart = useCartStore((state) => state.cart)
  const summary = di.GetCartSummaryUseCase.execute()

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return (
      <></>
    )
  }

  const onSaveOrder = async () => {
    setSavingOrder(true)
    setErrorMessage('')

    const products: OrderProduct[] = productsInCart.map((product) => ({
      id: product.id,
      quantity: product.quantity,
      size: product.size
    }))

    const resp = await placeOrder(products, address)
    if ( !resp.ok ) {
      setSavingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    di.ClearCartUseCase.execute()
    router.replace(`/orders/${resp.order}`)
    setSavingOrder(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">{address.firstName} {address.lastName}</p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.city}, {address.country}</p>
        <p>{address.postalCode}</p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */ }
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>
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

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */ }
          <span className="text-xs">
            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
          </span>
        </p>
        <p className="text-red-500">{ errorMessage }</p>
        <button
            //href="/orders/123"
            className={clsx({
              'btn-primary': !savingOrder,
              'btn-disabled': savingOrder,
            })}
            disabled={savingOrder}
            onClick={onSaveOrder}>
          Colocar orden
        </button>
      </div>
    </div>
  )
}
