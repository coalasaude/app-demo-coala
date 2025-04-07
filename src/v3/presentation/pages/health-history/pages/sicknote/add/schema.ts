import { Dayjs } from 'dayjs'
import * as yup from 'yup'

export interface IDiseaseFormFields {
  diagnose?: string
  dateAppointment: Dayjs
  hourAppointment: Dayjs
  sickNoteDays: string
  haveDiagnose: boolean
  document: File | null
}

export const schema = yup.object({
  diagnose: yup.string(),
  hourAppointment: yup.date().required(),
  dateAppointment: yup.date().required(),
  sickNoteDays: yup.string().required(),
  haveDiagnose: yup.boolean(),
  document: yup.mixed<File>().required(),
}) as any

export const initialValues = {
  diagnose: '',
  dateAppointment: '',
  hourAppointment: '',
  sickNoteDays: '',
  haveDiagnose: false,
  document: null,
} as unknown as IDiseaseFormFields
