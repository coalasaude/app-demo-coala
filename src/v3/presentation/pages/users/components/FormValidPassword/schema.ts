import * as yup from 'yup'

export interface IValidPasswordFormFields {
  password: string
}

export const schemaValidPassword = yup.object({
  password: yup.string().required(),
})
