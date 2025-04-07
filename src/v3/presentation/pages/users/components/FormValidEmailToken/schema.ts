import * as yup from 'yup'

export interface IValidTokenFormFields {
  token: string
}

export const schemaValidToken = yup.object({
  token: yup.string().required(),
})
