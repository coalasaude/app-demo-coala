import * as yup from 'yup'

export interface IFormUserDataFields {
  name: string
  lastname: string
  phone: string
  email: string
  registerCode?: string
}

export const schemaUser = yup.object({
  name: yup.string().required(),
  lastname: yup.string().required(),
  phone: yup.string().test({
    name: 'phone-or-email-required',
    exclusive: true,
    test: function (value) {
      const email = this.parent.email
      return !!value || !!email
    },
    message: 'Email ou telefone é obrigatório',
  }),
  email: yup
    .string()
    .email('Email inválido')
    .test({
      name: 'email-or-phone-required',
      exclusive: true,
      test: function (value) {
        const phone = this.parent.phone
        return !!value || !!phone
      },
      message: 'Email ou telefone é obrigatório',
    }),
})

export const schemaUserWithRegister = schemaUser.concat(
  yup.object({
    registerCode: yup.string().required(),
  }),
)
