import * as yup from 'yup'

export const schemaProfile = yup.object({
  name: yup.string().required(),
  type: yup.string().required(),
  institutionTypeId: yup
    .number()
    .transform((value) => (isNaN(value) ? null : value))
    .nullable(),
})

export const initialValuesProfile = {
  name: '',
  type: '',
  institutionTypeId: null,
  permissions: {},
}

export interface IProfileFormFields {
  permissions?: Record<string, boolean>
  name: string
  type: string
  institutionTypeId: number | null
}
