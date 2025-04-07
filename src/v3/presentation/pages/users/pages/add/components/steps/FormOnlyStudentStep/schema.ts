import * as yup from 'yup'

export const schemaNewDependents = yup.object({
  name: yup.string().required(),
  lastname: yup.string().required(),
})
