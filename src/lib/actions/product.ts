'use server'

import { revalidatePath } from 'next/cache'
import {z} from 'zod'
import {v2 as cloudinary} from 'cloudinary'

import { di } from '@/di/DependenciesLocator'
import { CreateProduct } from '@/domain/model'

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

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

  let images: (string | null)[] | null = []
  if (formData.getAll('images')) {
    images = await uploadImages(formData.getAll('images') as File[])
    if ( !images ) {
      throw new Error('No se pudo cargar las imágenes, rollingback');
    }
  }
  
  const productData: CreateProduct = {
    ...product,
    images
  }
  try {
    const res = await di.SaveProductUseCase.execute(productData)
    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${ product.slug }`);
    revalidatePath(`/product/${ product.slug }`);
    return {
      ok: true,
      product: res
    }
  } catch (error) {
    return { ok: false }
  }
}

const uploadImages = async( images: File[] ) => {
  try {
    const uploadPromises = images.map( async( image) => {

      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
  
        return cloudinary.uploader.upload(`data:image/png;base64,${ base64Image }`, { folder: 'teslo' })
          .then( r => r.secure_url );
        
      } catch (error) {
        console.log(error);
        return null;
      }
    })


    const uploadedImages = await Promise.all( uploadPromises );
    return uploadedImages
  } catch (error) {
    return null
  }
}

export const deleteProductImage = async( imageId: number, imageUrl: string ) => {
  if ( !imageUrl.startsWith('http') ) {
    return {
      ok: false,
      error: 'No se pueden borrar imagenes de FS'
    }
  }

  const imageName = imageUrl
    .split('/')
    .pop()
    ?.split('.')[0] ?? ''
  
  try {
    await cloudinary.uploader.destroy(`teslo/${imageName}`)
    const res = await di.DeleteImageUseCase.execute(imageId)
    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${res}`)
    revalidatePath(`/product/${res}`)
  } catch (error) {
    return { ok: false }
  }
}
