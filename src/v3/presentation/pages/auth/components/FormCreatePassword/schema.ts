import * as yup from 'yup'

export type IFormCreatePassword = {
  password: string
  passwordConfirm: string
}

export const createPasswordSchema = yup.object({
  password: yup.string().required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null as unknown as any], 'As senhas devem ser iguais')
    .required(),
})
