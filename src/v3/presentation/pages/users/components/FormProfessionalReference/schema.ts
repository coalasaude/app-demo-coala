import * as yup from 'yup'

import { ProfessionalType } from '@/types/professionalReference'

export interface IProfessionalFormFields {
  name: string
  phone: string
  professionalType: ProfessionalType
  email?: string
}

export const schemaProfessional = yup.object({
  name: yup.string().required(),
  phone: yup.string().required(),
  professionalType: yup.string().required(),
  email: yup.string().email(),
})
