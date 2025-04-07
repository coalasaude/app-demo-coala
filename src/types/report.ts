import { DefaultStatus } from './status'
import { User } from './user'
import { UserProfile } from './userProfile'

export interface Report {
  id: number
  created_at: Date
  updated_at: Date | null
  document: string
  pin: number
  appointment_id: number
  professional_id: number
  professional_role_id: number
  professional: User
  professionalRole: UserProfile
  title: string
  body: string
  status: DefaultStatus
  invalidated_at: Date | null
  document_id: number
}
