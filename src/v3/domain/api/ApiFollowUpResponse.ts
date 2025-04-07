import { DefaultStatus } from '@/types/status'

import {
  MeansContact,
  UserContact,
  TypeAssistance,
  PatientEvolution,
  WhoLibered,
} from '../follow-up'
import { User } from '../User'

export interface TApiFollowUpResponse {
  id: number
  means_contact?: MeansContact
  user_made_contact?: UserContact
  who_is?: string
  who_libered?: WhoLibered
  user_without_access?: string
  outcome?: string
  user_id?: number
  date_of_contact?: Date
  time_of_contact?: Date
  patient?: User
  user?: User
  successful_contact?: boolean
  face_to_face_assistance?: boolean
  type_assistance?: TypeAssistance
  name_assistance?: string
  contact_assistance?: string
  change_conduct?: boolean
  detail?: string
  patient_id?: number
  appointment_id?: number
  being_monitored?: boolean
  status?: DefaultStatus
  patient_evolution?: PatientEvolution
  date_next_contact: Date
  time_next_contact: Date
  created_at: Date
  updated_at?: Date
}

export type CreateFollowUpProps = {
  appointmentId: number
  body: TApiFollowUpResponse
}
