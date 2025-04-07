import * as yup from 'yup'

export interface IProfileFormFields {
  institutionId: number | null
  profileId: number
}

export const schemaProfile = yup.object({
  institutionId: yup.number().nullable().not([undefined], 'Este campo é obrigatório.'),
  profileId: yup.number().required(),
})
