import { DefaultStatus } from '@/types/status'

import { TApiFollowUpResponse } from './api/ApiFollowUpResponse'
import { User } from './User'

export enum MeansContact {
  TELEPHONE = 'TELEPHONE',
  WHATS_APP = 'WHATS_APP',
  EMAIL = 'EMAIL',
  CHAT = 'CHAT',
}

export enum UserContact {
  COLLABORATOR = 'COLLABORATOR',
  RESPONSIBLE = 'RESPONSIBLE',
  OTHER = 'OTHER',
}

export enum TypeAssistance {
  HOSPITAL = 'HOSPITAL',
  ORTHOPEDICS = 'ORTHOPEDICS',
  OPHTHALMOLOGY = 'OPHTHALMOLOGY',
  DENTISTRY = 'DENTISTRY',
  OTORHINOLARYNGOLOGY = 'OTORHINOLARYNGOLOGY',
  PEDIATRIC_ASSISTANT = 'PEDIATRIC_ASSISTANT',
}

export enum WhoLibered {
  COALA = 'COALA',
  EXTERNAL_PROFESSIONAL = 'EXTERNAL_PROFESSIONAL',
}

export enum PatientEvolution {
  RETRIEVED = 'RETRIEVED',
  BETTER = 'BETTER',
  MAINTAINED = 'MAINTAINED',
  WORST = 'WORST',
}

export enum AdherenceToTreatment {
  NOT_STARTED = 'NOT_STARTED',
  CONTINUOUS = 'CONTINUOUS',
  INTERMITTENT = 'INTERMITTENT',
  DISCONTINUED = 'DISCONTINUED',
  COMPLETED = 'COMPLETED',
}

export class FollowUp {
  id: number
  meansContact?: MeansContact
  userMadeContact?: UserContact
  userId?: number
  user?: User
  dateOfContact?: Date
  timeOfContact?: Date
  patientId?: number
  whoIs?: string
  userWithoutAccess?: string
  whoLibered?: WhoLibered
  outcome?: string
  patient?: User
  appointmentId?: number
  successfulContact?: boolean
  faceToFaceAssistance?: boolean
  typeAssistance?: TypeAssistance
  nameAssistance?: string
  contactAssistance?: string
  changeConduct?: boolean
  detail?: string
  beingMonitored?: boolean
  status?: DefaultStatus
  patientEvolution?: PatientEvolution
  dateNextContact?: Date
  timeNextContact?: Date
  createdAt?: Date
  updatedAt?: Date

  constructor(followUp: TApiFollowUpResponse) {
    this.id = followUp?.id
    this.meansContact = followUp?.means_contact
    this.userMadeContact = followUp?.user_made_contact
    this.patientId = followUp?.patient_id
    this.whoLibered = followUp?.who_libered
    this.userWithoutAccess = followUp?.user_without_access
    this.whoIs = followUp?.who_is
    this.outcome = followUp?.outcome
    this.appointmentId = followUp?.appointment_id
    this.userId = followUp?.user_id
    this.user = followUp?.user
    this.patient = followUp?.patient
    this.dateOfContact = followUp?.date_of_contact
    this.timeOfContact = followUp?.time_of_contact
    this.successfulContact = followUp?.successful_contact
    this.faceToFaceAssistance = followUp?.face_to_face_assistance
    this.typeAssistance = followUp?.type_assistance
    this.nameAssistance = followUp?.name_assistance
    this.contactAssistance = followUp?.contact_assistance
    this.changeConduct = followUp?.change_conduct
    this.detail = followUp?.detail
    this.status = followUp?.status
    this.beingMonitored = followUp?.being_monitored
    this.patientEvolution = followUp?.patient_evolution
    this.dateNextContact = followUp?.date_next_contact
    this.timeNextContact = followUp?.time_next_contact
    this.createdAt = followUp?.created_at
    this.updatedAt = followUp?.updated_at
  }
}
