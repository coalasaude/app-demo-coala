import * as yup from 'yup'

import { MAX_FILE_SIZE } from '@/constants/fileSize'

export interface IFormAddAppointment {
  file: File | null
  institutionId: number | null
  complaint: string
  resume: string
  hasNoPatient: boolean
  isAccident?: boolean
  patientId: number | null
  requestedUserId: number | null
  enableNotification?: boolean | null
}

export const schema = yup.object({
  institutionId: yup.number().required(),
  requestedUserId: yup.number().nullable().optional(),
  resume: yup.string().required(),
  hasNoPatient: yup.boolean().optional(),
  patientId: yup
    .number()
    .when('hasNoPatient', {
      is: (hasNoPatient: boolean) => !hasNoPatient,
      then: (schema) => schema.required(),
    })
    .nullable(),
  enableNotification: yup.boolean().nullable(),
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
  hasNoPatient: false,
  requestedUserId: null,
  file: null,
  enableNotification: null,
} as IFormAddAppointment
