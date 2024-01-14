import { Gender } from '../Product'
import { Address } from '../Address'

export type RegisterUserForm = {
  name: string,
  email: string,
  password: string
}

export type AddressFormInputs = Address & {
  remember: boolean
}

export type ProductFormInputs = {
  title: string,
  slug: string,
  description: string,
  price: number,
  inStock: number,
  sizes: string[],
  tags: string,
  gender: Gender,
  categoryId: string,
  images?: FileList
}
