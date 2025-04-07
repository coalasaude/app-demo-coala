import * as yup from 'yup'

import { FileAsync } from '@/types/FileAsync'

export interface IReportFormFields {
  name: string
  professionalName: string
  professionalType: number
  professionalRegister: string
  emissionDate: Date
  file: FileAsync
}

export const schemaReport = yup.object({
  name: yup.string().required(),
  professionalName: yup.string().required(),
  professionalType: yup.number().required(),
  professionalRegister: yup.string().required(),
  emissionDate: yup.date().required(),
  file: yup.mixed<FileAsync>().required(),
}) as any

export const initialValuesReport = {
  name: '',
  professionalName: '',
  professionalType: null,
  professionalRegister: '',
  emissionDate: null,
  file: null,
} as unknown as IReportFormFields
