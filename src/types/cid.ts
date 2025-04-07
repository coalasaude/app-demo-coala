import { DefaultStatus } from './status'
import { User } from './user'

export interface Cid {
  id: number
  code: string
  code_description: string
  category_description: string
}

export interface CidAppointment {
  id: number
  appointment_id: number
  cid_id: number
  user_id: number
  description: string
  type: CidAppointmentType
  created_at: Date
  status: DefaultStatus
  user: User
  professional: User
  professional_id: number
  cid: Cid
}

export enum CidAppointmentType {
  HYPOTHESIS = 'HYPOTHESIS',
  FINAL = 'FINAL',
}
