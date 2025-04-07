import { Dayjs } from 'dayjs'
import * as yup from 'yup'

import { MAX_FILE_SIZE } from '@/constants/fileSize'

export interface IFormAddRetroactiveAppointment {
  file: File | null
  institutionId: number | null
  resume: string
  patientId: number | null
  requestedUserId: number | null
  createdAtDate: Dayjs
  createdAtTime: Dayjs
  openedAtDate: Dayjs
  openedAtTime: Dayjs
  closedAtTime: Dayjs
  finishedReason: string
  professionalId: number
}

export const schema = yup.object({
  institutionId: yup.number().required(),
  requestedUserId: yup.number().nullable().optional(),
  resume: yup.string().required(),
  patientId: yup.number().required(),
  createdAtDate: yup.date().required(),
  createdAtTime: yup.date().required(),
  openedAtDate: yup.date().required(),
  openedAtTime: yup.date().required(),
  closedAtTime: yup.date().required(),
  finishedReason: yup.string().required(),
  professionalId: yup.number().required(),
  file: yup
    .mixed()
    .optional()
    .nullable()
    .test('is-valid-size', 'Arquivo muito grande. O tamanho máximo é de 10MB', (value: any) => {
      if (!value) return true
      if (value.size < MAX_FILE_SIZE) return true
    }),
}) as any

export const initialValues = {
  resume: '',
  patientId: null,
  institutionId: null,
  requestedUserId: null,
  file: null,
} as IFormAddRetroactiveAppointment
