import * as yup from 'yup'

export type FormFieldsDifficultiesProps = {
  name: string
  description: string
}

export interface FormFieldsProps {
  difficulties: FormFieldsDifficultiesProps[]
}

export const schemaDifficultiess = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
}) as any

export const schemaManyDifficulties = yup.object({
  difficulties: yup.array().min(1).of(schemaDifficultiess),
}) as any

export const initialDifficultiessValues = {
  name: '',
  description: '',
} as FormFieldsDifficultiesProps

export const initialValues = {
  difficulties: [initialDifficultiessValues],
} as FormFieldsProps
