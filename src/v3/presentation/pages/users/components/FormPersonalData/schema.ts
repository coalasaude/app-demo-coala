import * as yup from 'yup'
import { isValidCPF } from '@brazilian-utils/brazilian-utils'

export interface IPersonalDataFormFields {
  name: string
  lastname: string
  cpf: string
  email: string
  phone: string
}

export const schemaPersonalData = yup.object({
  name: yup.string().required(),
  lastname: yup.string().required(),
  cpf: yup.string().test('cpf', 'CPF inválido', (value) => {
    if (!value) return true
    return isValidCPF(value)
  }),
  email: yup.string().email(),
  phone: yup.string(),
})
