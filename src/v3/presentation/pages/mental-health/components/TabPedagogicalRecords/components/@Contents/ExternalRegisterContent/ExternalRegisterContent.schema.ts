import * as yup from 'yup'

import { FileAsync } from '@/types/FileAsync'

export type FormFieldsExternalRegisterProps = {
  title: string
  professionalName: string
  professionalTypeId: number
  professionalRegister: string
  description: string
  document?: FileAsync | null
}

export interface FormFieldsProps {
  externalRegisters: FormFieldsExternalRegisterProps[]
}

export const schemaExternalRegisters = yup.object({
  title: yup.string().required(),
  professionalName: yup.string().required(),
  professionalTypeId: yup.number().required(),
  professionalRegister: yup.string().required(),
  description: yup.string().required(),
  document: yup.mixed<FileAsync>().optional().nullable(),
}) as any

export const schemaManyExternalRegister = yup.object({
  externalRegisters: yup.array().min(1).of(schemaExternalRegisters),
}) as any

export const initialExternalRegistersValues = {
  title: '',
  professionalName: '',
  professionalRegister: '',
  description: '',
  professionalTypeId: undefined as unknown as number,
  document: null,
} as FormFieldsExternalRegisterProps

export const initialValues = {
  externalRegisters: [initialExternalRegistersValues],
} as FormFieldsProps
