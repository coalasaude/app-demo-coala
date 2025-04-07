import { Appointment } from './appointment'
import { User } from './user'

export enum GradeStatus {
  VERY_SATISFIED = 'VERY_SATISFIED',
  SATISFIED = 'SATISFIED',
  INDIFFERENT = 'INDIFFERENT',
  DISSATISFIED = 'DISSATISFIED',
  VERY_DISSATISFIED = 'VERY_DISSATISFIED',
}

export interface AppointmentFeedback {
  id: number
  appointment: Appointment
  appointment_id: number
  user: User
  user_id: number
  grade: GradeStatus
  comment: string
  created_at: Date
  updated_at: Date | null
}
