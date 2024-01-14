'use client'
import { useEffect, useState } from 'react'

import { titleFont } from '@/config/fonts'
import { getStockAction } from './getStock'

type Props = {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getStock = async () => {
      const stock = await getStockAction(slug)
      setStock(stock)
      setIsLoading(false)
    }
    getStock()
  }, [slug])
  

  return (
    <>
      {
        isLoading ? (
          <h1 className={ ` ${ titleFont.className } antialiased font-bold text-md bg-gray-200 animate-pulse` }>
            &nbsp;
          </h1>
        ) : (
          <h1 className={ ` ${ titleFont.className } antialiased font-bold text-md` }>
            Stock: { stock }
          </h1>
        )
      }
    </>
  )
}
