import * as yup from 'yup'

export const initialValuesChangePassword = {
  oldPassword: null,
  hasPassword: false,
  password: '',
  passwordConfirm: '',
}

export const schemaChangePassword = yup.object({
  oldPassword: yup.string().when('hasPassword', {
    is: (hasPassword: boolean) => hasPassword,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.nullable(),
  }),
  hasPassword: yup.boolean().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/,
      'Siga as instruções abaixo para criar uma senha segura',
    )
    .required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
    .required(),
}) as any

export type ChangePasswordFormData = {
  oldPassword?: string
  hasPassword: boolean
  password: string
  passwordConfirm: string
}
