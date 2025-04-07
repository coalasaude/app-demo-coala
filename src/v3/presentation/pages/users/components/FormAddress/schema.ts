import * as yup from 'yup'

export interface IAddressFormFields {
  zipCode: string
  city: string
  neighborhood: string
  state: string
  street: string
  number: string
  complement: string
}

export const schemaAddress = yup.object({
  zipCode: yup.string().nullable(),
  city: yup.string().nullable(),
  neighborhood: yup.string().nullable(),
  state: yup.string().nullable(),
  street: yup.string().nullable(),
  number: yup.string().nullable(),
  complement: yup.string().nullable(),
})
