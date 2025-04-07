import * as yup from 'yup'

export interface IChangeEmailFormFields {
  email?: string
}

export const schemaChangeEmail = yup.object({
  email: yup.string().email(),
})
