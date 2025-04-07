import * as yup from 'yup'

import {
  IProfessionalFormFields,
  schemaProfessional,
} from '@/v3/presentation/pages/users/components/FormProfessionalReference/schema'
export interface IProfessionalsFormFields {
  professionalReference: IProfessionalFormFields[]
}

export const schemaProfessionals = yup.object<IProfessionalsFormFields>({
  professionalReference: yup.array().min(1).of(schemaProfessional),
})

export const professionalsDefaultValues = {
  professionalReference: [{ name: '' }],
} as unknown as IProfessionalsFormFields
