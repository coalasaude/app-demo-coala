import { isValidPhone, onlyNumbers } from '@brazilian-utils/brazilian-utils'
import * as yup from 'yup'

import { cleanTelephone } from '@/utils/cleanTelephone'

export const registrationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  telephone: yup.string()
    .required()
    .test('is-valid-phone', 'Telefone inválido', (value) => {
      if (!value) return true
      return !!value && isValidPhone(cleanTelephone(value))
    })
    .transform(onlyNumbers),
  schoolName: yup.string().required(),
  lookingFor: yup.array().of(yup.string()).required(),
  acceptWhatsApp: yup.boolean().nullable(),
  type: yup.string().required(),
  other: yup.string().nullable(),
})

export const defaultValues = {
  name: '',
  email: '',
  telephone: '',
  schoolName: '',
  lookingFor: [],
  acceptWhatsApp: false,
  type: '',
  other: '',
}
