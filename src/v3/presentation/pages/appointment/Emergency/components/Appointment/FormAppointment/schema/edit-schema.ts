import * as yup from 'yup'

export interface IFormEditAppointment {
  institutionId: number | null
  patientId: number | null
  hasNoPatient?: boolean
  requestedUserId: number | null
}

export const schemaEdit = yup.object({
  institutionId: yup.number().required(),
  requestedUserId: yup.number().required(),
  patientId: yup.number().required(),
}) as any

export const initialEditAppointmentValues = {
  patientId: null,
  institutionId: null,
  requestedUserId: null,
} as IFormEditAppointment
