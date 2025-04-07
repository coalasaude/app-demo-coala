import * as yup from 'yup'

export const schemaDependent = yup.object({
  nameOrId: yup.string().required(),
  lastname: yup.string().required(),
  institutionId: yup.number().required(),
})

export interface IDependent {
  nameOrId: string
  lastname: string
  institutionId: number
}
