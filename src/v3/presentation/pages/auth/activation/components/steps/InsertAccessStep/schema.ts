import * as yup from 'yup'

import { cleanTelephone } from '@/utils/cleanTelephone'
import { isValidPhone } from '@/validators/phone'
import { onlyNumbers } from '@/v3/utils/onlyNumbers'

export type IFormAccess = {
  access: string
}

export const emailAccessSchema = yup.object({
  access: yup.string().email().required(),
})

export const phoneAccessSchema = yup.object({
  access: yup
    .string()
    .required()
    .test('is-valid-phone', 'Telefone inválido', (value) => {
      if (!value) return true
      return !!value && isValidPhone(cleanTelephone(value))
    })
    .transform(onlyNumbers),
})
