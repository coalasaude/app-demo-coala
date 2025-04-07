import { Cid } from './cid'
import { DefaultStatus } from './status'
import { User } from './user'

export interface SickNote {
  id: number
  created_at: Date
  updated_at: Date | null
  valid_until: Date
  document: string
  pin: number
  appointment_id: number
  professional_id: number
  professional_role_id: number
  professional: User
  body: string
  cid: Cid | null
  status: DefaultStatus
  invalidated_at: Date | null
  document_id: number
}
