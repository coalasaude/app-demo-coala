import {
  MeansContact,
  UserContact,
  PatientEvolution,
  TypeAssistance,
  AdherenceToTreatment,
  WhoLibered,
} from '@/v3/domain/follow-up'

import { TFollowUp } from './TFollowUp'

export const initialValues = {
  means_contact: MeansContact.TELEPHONE,
  user_made_contact: UserContact.COLLABORATOR,
  user_id: '',
  date_of_contact: new Date(),
  time_of_contact: new Date(),
  successful_contact: false,
  face_to_face_assistance: false,
  type_assistance: TypeAssistance.PEDIATRIC_ASSISTANT,
  name_assistance: '',
  contact_assistance: '',
  change_conduct: false,
  detail: '',
  adherence_to_treatment: AdherenceToTreatment.NOT_STARTED,
  being_monitored: false,
  who_libered: WhoLibered.COALA,
  user_without_access: '',
  outcome: '',
  patient_evolution: PatientEvolution.BETTER,
  date_next_contact: new Date(),
  time_next_contact: new Date(),
} as unknown as TFollowUp
