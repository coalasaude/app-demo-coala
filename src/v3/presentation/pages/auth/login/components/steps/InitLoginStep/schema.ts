import * as yup from 'yup'

export type IFormAccess = {
  access: string
}

export const accessSchema = yup.object({
  access: yup.string().required(),
})
