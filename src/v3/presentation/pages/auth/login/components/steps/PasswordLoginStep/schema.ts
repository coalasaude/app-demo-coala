import * as yup from 'yup'

export type IFormPassword = {
  password: string
}

export const passwordSchema = yup.object({
  password: yup.string().required(),
})
