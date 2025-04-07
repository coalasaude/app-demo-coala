import { Institution } from './institution'
import { Report } from './report'
import { User } from './user'

export interface InstitutionalAppointment {
  id: number
  institution_id: number | null
  requested_user_id: number | null
  requested_user_role_id: number | null
  scheduled_appointment_id: number | null
  reportInstitutionalAppointment: Report[]
  institution: Institution
  requestedUser: User
  created_at: Date
  updated_at: Date | null
  room_meet_id: string
}
