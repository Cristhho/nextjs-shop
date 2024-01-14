'use server'

import { di } from '@/di/DependenciesLocator'
import {z} from 'zod'

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform( val => Number(val.toFixed(2)) ),
  inStock: z.coerce
    .number()
    .min(0)
    .transform( val => Number(val.toFixed(0)) ),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform( val => val.split(',') ),
  tags: z.string(),
  gender: z.nativeEnum({
    men: "men",
    women: "women",
    kid: "kid",
    unisex: "unisex"
  }), 
})

export const createOrUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data)

  if (!productParsed.success) {
    console.log( productParsed.error );
    return { ok: false }
  }
  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, '-' ).trim()
  
  try {
    const res = await di.SaveProductUseCase.execute(product)
    return {
      ok: true,
      product: res
    }
  } catch (error) {
    return { ok: false }
  }
}
