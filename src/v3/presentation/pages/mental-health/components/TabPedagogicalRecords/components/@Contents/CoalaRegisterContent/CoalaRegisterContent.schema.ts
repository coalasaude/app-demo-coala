import * as yup from 'yup'

import { FileAsync } from '@/types/FileAsync'

export type FormFieldsCoalaRegisterProps = {
  title: string
  description: string
  document?: FileAsync | null
}

export interface FormFieldsProps {
  coalaRegisters: FormFieldsCoalaRegisterProps[]
}

export const schemaCoalaRegisters = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  document: yup.mixed<FileAsync>().optional().nullable(),
}) as any

export const schemaManyCoalaRegister = yup.object({
  coalaRegisters: yup.array().min(1).of(schemaCoalaRegisters),
}) as any

export const initialCoalaRegistersValues = {
  title: '',
  description: '',
  document: null,
} as FormFieldsCoalaRegisterProps

export const initialValues = {
  coalaRegisters: [initialCoalaRegistersValues],
} as FormFieldsProps
