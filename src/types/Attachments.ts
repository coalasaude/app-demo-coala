import { DefaultStatus } from './status'
import { User } from './user'

export interface Attachments {
  id: number
  created_at: Date
  updated_at: Date | null
  appointment_id: number
  professional_id: number
  title: string
  status: DefaultStatus
  user: User
  document_id: number
}
