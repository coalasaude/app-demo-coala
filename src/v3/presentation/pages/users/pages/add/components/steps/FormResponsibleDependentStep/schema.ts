import * as yup from 'yup'

export interface IFormResponsibleWithDependents {
  name: string
  lastname: string
  dependentsIds: number[]
}

export const schemaDependents = yup.object({
  name: yup.string().test({
    name: 'fullname-or-dependents',
    exclusive: true,
    test: function (value) {
      const dependentsIds = this.parent.dependentsIds
      return !!value || !!dependentsIds?.length
    },
    message: 'Nome é obrigatório',
  }),
  lastname: yup.string().test({
    name: 'fullname-or-dependents',
    exclusive: true,
    test: function (value) {
      const dependentsIds = this.parent.dependentsIds
      return !!value || !!dependentsIds?.length
    },
    message: 'Sobrenome é obrigatório',
  }),
  dependentsIds: yup.array().of(yup.number()).optional(),
})
