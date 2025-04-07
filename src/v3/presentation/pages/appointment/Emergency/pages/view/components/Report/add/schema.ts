import * as yup from 'yup'

export interface IForm {
  title: string
  certificatePass: string
  body: string
}

export const schema = yup.object({
  title: yup.string().max(50).required(),
  body: yup.string().max(4000).required(),
}) as any

export const initialValues = {
  certificatePass: '',
  title: '',
  body: '',
} as unknown as IForm
