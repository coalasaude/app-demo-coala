import * as yup from 'yup'

export interface IFormProfiles {
  profileId?: number
  institutionId?: number | null
  registration?: string
  enrollment?: string
  class?: string
  companyPositionId?: number
  educationalStageId?: number
  schoolGradeId?: number
}

export const schemaProfile = yup.object({
  institutionId: yup.number().nullable().not([undefined], 'Este campo é obrigatório.'),
  profileId: yup.number().required(),
  isMedicalProfile: yup.boolean().optional(),
  registration: yup.string().when('isMedicalProfile', {
    is: (value: any) => value,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.nullable().optional(),
  }),
  enrollment: yup.string().optional().nullable(),
  class: yup.string().optional().nullable(),
  companyPositionId: yup.number().optional().nullable(),
  educationalStageId: yup.number().optional().nullable(),
  schoolGradeId: yup.number().optional().nullable(),
}) as any

export const initialValuesProfile = {
  institutionId: undefined,
} as IFormProfiles
