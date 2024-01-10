import { Address } from '../Address'

export type RegisterUserForm = {
  name: string,
  email: string,
  password: string
}

export type AddressFormInputs = Address & {
  remember: boolean
}
