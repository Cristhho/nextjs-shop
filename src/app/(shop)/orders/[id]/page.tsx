import { redirect } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';

import { Title } from '@/components';
import { di } from '@/di/DependenciesLocator';
import { currencyFormat } from '@/utils';
import { auth } from '@/auth.config';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage( { params }: Props ) {

  const session = await auth()
  if (!session) redirect('/')
  const { id } = params;
  const order = await di.GetOrderByIdUseCase.execute(id, session.user.id)

  if (!order) redirect('/')

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={ `Orden #${ id.split('-').at(-1) }` } />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */ }
          <div className="flex flex-col mt-5">
            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': !order.header.isPaid,
                  'bg-green-700': order.header.isPaid,
                }
              )
            }>
              <IoCardOutline size={ 30 } />
              <span className="mx-2">{order.header.isPaid ? 'Pagada' : 'Pendiente de pago'}</span>
            </div>

            {/* Items */ }
            {
              order.items.map( product => (
                <div key={`${product.slug}_${product.size}`} className="flex mb-5">
                  <Image
                    src={ `/products/${product.image}` }
                    width={ 100 }
                    height={ 100 }
                    style={ {
                      width: '100px',
                      height: '100px'
                    } }
                    alt={ product.title }
                    className="mr-5 rounded"
                  />
                  <div>
                    <p>{ product.title }</p>
                    <p>{ currencyFormat(product.price) } x {product.quantity}</p>
                    <p className="font-bold">Subtotal: { currencyFormat(product.price * product.quantity) }</p>
                  </div>
                </div>
              ) )
            }
          </div>

          {/* Checkout - Resumen de orden */ }
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.address}</p>
              <p>{order.address.address2}</p>
              <p>{order.address.city}, {order.address.country}</p>
              <p>{order.address.postalCode}</p>
              <p>{order.address.phone}</p>
            </div>

            {/* Divider */ }
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">{order.header.itemsInOrder === 1 ? "1 artículo" : `${order.header.itemsInOrder} artículos`}</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order.header.subTotal)}</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order.header.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">{currencyFormat(order.header.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}