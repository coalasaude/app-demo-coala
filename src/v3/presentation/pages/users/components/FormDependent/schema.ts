import * as yup from 'yup'

export interface IFormDependentDataFields {
  name: string
  lastname: string
  birthday: Date
  genre: string
}

export const schemaFormDependentDataFields = yup.object({
  name: yup.string().required(),
  lastname: yup.string().required(),
  birthday: yup.date().required(),
  genre: yup.string().required(),
})
