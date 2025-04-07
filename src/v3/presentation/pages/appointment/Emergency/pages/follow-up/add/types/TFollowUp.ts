import { MeansContact, UserContact, PatientEvolution, TypeAssistance } from '@/v3/domain/follow-up'

export interface TFollowUp {
  means_contact: MeansContact
  user_made_contact: UserContact
  user_id?: number
  date_of_contact: Date
  time_of_contact: Date
  user_without_access?: string
  successful_contact: boolean
  face_to_face_assistance: boolean
  type_assistance?: TypeAssistance
  name_assistance?: string
  contact_assistance?: string
  change_conduct: boolean
  detail?: string
  being_monitored: boolean
  patient_evolution: PatientEvolution
  date_next_contact: Date
  time_next_contact: Date
}
