import * as yup from 'yup'

import { IAllergyFormFields, schemaAllergy } from '@/v3/presentation/pages/health-history/components/FormAllergy/schema'

export interface IAllergiesFormFields {
  allergies: IAllergyFormFields[]
}

export const schemaAllergies = yup.object({
  allergies: yup.array().min(1).of(schemaAllergy)
})