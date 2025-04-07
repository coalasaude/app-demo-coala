import * as yup from 'yup'

export const schema = yup.object({
  question: yup.string()
}) as any

export const initialValues = {
  question: '',
}
