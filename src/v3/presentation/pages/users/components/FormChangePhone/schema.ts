import { isValidPhone, onlyNumbers } from '@brazilian-utils/brazilian-utils'
import * as yup from 'yup'

import { cleanTelephone } from '@/utils/cleanTelephone'

export interface IChangePhoneFormFields {
  phone?: string
}

export const schemaChangePhone = yup.object({
  phone: yup
    .string()
    .test('is-valid-phone', 'Telefone inválido', (value) => {
      if (!value) return true
      return !!value && isValidPhone(cleanTelephone(value))
    })
    .transform(onlyNumbers),
})
