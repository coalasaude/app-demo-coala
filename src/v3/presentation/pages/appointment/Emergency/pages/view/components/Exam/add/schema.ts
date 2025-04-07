import * as yup from 'yup'

export interface IForm {
  valid_until: string
  certificatePass: string
  description: string
  recommendation: string
}

export const schema = yup.object({
  valid_until: yup.number().max(90).required(),
  description: yup.string().required(),
  recommendation: yup.string().required(),
}) as any

export const initialValues = {
  certificatePass: '',
  valid_until: '',
  description: '',
  recommendation: '',
} as unknown as IForm
