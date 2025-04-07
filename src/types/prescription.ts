import { Appointment } from './appointment'
import { Medicine } from './medicine'
import { DefaultStatus } from './status'
import { User } from './user'

export interface Prescription {
  id: number
  created_at: Date
  updated_at: Date | null
  valid_until: Date
  document: string
  pin: number
  professional_id: number
  professional_role_id: number
  type_prescription: PrescriptionEnum
  status: DefaultStatus
  invalidated_at: Date | null
  appointment_id: number
  appointment: Appointment
  professional: User
  document_id: number
  medicine: Medicine[]
}

export enum PrescriptionEnum {
  SIMPLE = 'SIMPLE',
  SPECIAL_CONTROL = 'SPECIAL_CONTROL',
}
