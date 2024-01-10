export type RegisterUserForm = {
  name: string,
  email: string,
  password: string
}

export type AddressFormInputs = {
  firstName: string,
  lastName: string,
  address: string,
  address2?: string,
  postalCode: string,
  city: string,
  country: string,
  phone: string,
  remember: boolean
}
