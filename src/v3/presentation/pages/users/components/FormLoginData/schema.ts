import * as yup from 'yup'

export interface IPersonalDataFormFields {
  email: string
  phone: string
  password: string
}

export const schemaLoginData = yup.object({
  email: yup.string().email(),
  phone: yup.string(),
  password: yup.string().nullable(),
})
