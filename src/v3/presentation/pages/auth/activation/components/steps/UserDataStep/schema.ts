import * as yup from 'yup'
import { isValidCPF } from '@brazilian-utils/brazilian-utils'

export type IFormUserData = {
  name: string
  lastname: string
  cpf: string
  isSigned: boolean
}

export const userDataSchema = yup.object({
  name: yup.string().required(),
  isSigned: yup.boolean().isTrue('Este campo é obrigatório'),
  lastname: yup.string().required(),
  cpf: yup.string().test('cpf', 'CPF inválido', (value) => {
    if (!value) return false
    return isValidCPF(value)
  }),
} as any)
