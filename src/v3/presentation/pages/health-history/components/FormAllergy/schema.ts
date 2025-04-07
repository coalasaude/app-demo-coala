import * as yup from 'yup'

export interface IAllergyFormFields {
  otherCategory?: string
  causerAgent: string
  symptom: number[]
  orientations: string
  categoryId: string
}

export const schemaAllergy = yup.object({
  causerAgent: yup.string().required(),
  symptom: yup.array(yup.number().required()).required().min(1),
  orientations: yup.string(),
  categoryId: yup.string().required(),
  otherCategory: yup.string().nullable(),
})

export const allergyInitialValues = {
  otherCategory: '',
  causerAgent: '',
  symptom: [],
  orientations: '',
  categoryId: '',
}
