'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'

import { Category, Product, ProductFormInputs } from '@/domain/model'
import { createOrUpdateProduct } from '@/lib/actions'
import { ProductImage } from '@/components'

type Props = {
  product: Partial<Product>,
  categories: Category[]
}
const sizes = ['XS','S','M','L','XL','XXL']
export const ProductForm = ({ categories, product }: Props) => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<ProductFormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(','),
      sizes: product.sizes ?? [],
      images: undefined
    }
  })
  watch('sizes')

  const onSizeChanged = ( size: string ) => {
    const sizes = new Set(getValues('sizes'));
    sizes.has( size ) ? sizes.delete(size) : sizes.add(size);
    setValue('sizes', Array.from( sizes ) );
  }

  const onSubmit = async (data: ProductFormInputs) => {
    const formData = new FormData()
    const {images, ...productToSave} = data
    if (product.id) formData.append('id', product.id)
    formData.append('title', productToSave.title)
    formData.append('slug', productToSave.slug)
    formData.append('description', productToSave.description)
    formData.append('price', productToSave.price.toString() )
    formData.append('inStock', productToSave.inStock.toString() )
    formData.append('sizes', productToSave.sizes.toString() )
    formData.append('tags', productToSave.tags )
    formData.append('categoryId', productToSave.categoryId )
    formData.append('gender', productToSave.gender )

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    const res = await createOrUpdateProduct(formData)
    if (!res.ok) {
      return;
    }

    router.replace(`/admin/products/${res.product}`)
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) } className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('title', { required: true }) } />
        </div>
        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('slug', { required: true }) } />
        </div>
        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            { ...register('description', { required: true }) }
          ></textarea>
        </div>
        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" { ...register('price', { required: true, min: 0 }) } />
        </div>
        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" { ...register('tags', { required: true }) } />
        </div>
        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-gray-200" { ...register('gender', { required: true }) }>
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select className="p-2 border rounded-md bg-gray-200" { ...register('categoryId', { required: true }) }>
            <option value="">[Seleccione]</option>
            {
              categories.map( category => (
                <option key={ category.id } value={ category.id }>{ category.name }</option>
              ))
            }
          </select>
        </div>
        <button className="btn-primary w-full" type='submit'>
          Guardar
        </button>
      </div>
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {
              sizes.map( size => (
                <div 
                  key={ size } 
                  onClick={ () => onSizeChanged(size) }
                  className={
                    clsx(
                      "p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center",
                      {
                        'bg-blue-500 text-white': getValues('sizes').includes(size)
                      }
                    )
                  }
                >
                  <span>{ size }</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className="flex flex-col mb-2">
          <span>Fotos</span>
          <input 
            type="file"
            { ...register('images') }
            multiple 
            className="p-2 border rounded-md bg-gray-200" 
            accept="image/png, image/jpeg"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {
            product.ProductImage?.map( image => (
              <div key={ image.id }>
                <ProductImage
                  alt={ product.title ?? '' }
                  src={image.url}
                  width={ 300 }
                  height={ 300 }
                  className="rounded-t shadow-md"
                />
                <button 
                  type="button"
                  onClick={ () => console.log( image.id, image.url )  }
                  className="btn-danger w-full rounded-b-xl">
                  Eliminar
                </button>
              </div>
            ))
          }
        </div>
      </div>
    </form>
  )
}
