import { DefaultStatus } from './status'
import { User } from './user'

export interface Exam {
  id: number
  created_at: Date
  updated_at: Date | null
  valid_until: number
  document: string
  pin: number
  appointment_id: number
  professional_id: number
  description: string
  recommendation: string
  status: DefaultStatus
  invalidated_at: Date | null
  professional: User
  document_id: number
}
