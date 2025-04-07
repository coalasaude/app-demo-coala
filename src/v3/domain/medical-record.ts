import { DefaultStatus } from '@/types/status'

import { User } from './User'
import { TUserProfile, UserProfile } from './UserProfile'
import { TApiUserResponse } from './api/ApiUserResponse'

export interface TApiMedicalRecordResponse {
  id: number
  created_at: Date
  updated_at: Date | null
  document: string
  pin: number
  professional_id: number
  professional_role_id: number
  diastolic: number | null
  professionalRole: TUserProfile
  professional: TApiUserResponse
  classification: MedicalRecordClassification
  heart_rate: number | null
  respiratory_frequency: number | null
  body_temperature: number | null
  oxygen_saturation: number | null
  history: string
  exam: string
  impression: string
  conduct: string
  status: DefaultStatus
  invalidated_at: Date | null
  appointment_id: number
  document_id: number
}

export enum MedicalRecordClassification {
  EMERGENCY = 'EMERGENCY',
  VERY_URGENT = 'VERY_URGENT',
  URGENT = 'URGENT',
  LOW_URGENT = 'LOW_URGENT',
  NOT_URGENT = 'NOT_URGENT',
  NO_CLASSIFICATION = 'NO_CLASSIFICATION',
}

export class MedicalRecord {
  id?: number
  createdAt?: Date
  updatedAt?: Date | null
  diastolic?: number | null
  document?: string
  pin?: number
  professionalId?: number
  professionalRoleId?: number
  professionalRole?: UserProfile
  professional?: User
  classification?: MedicalRecordClassification
  heartRate?: number | null
  respiratoryFrequency?: number | null
  bodyTemperature?: number | null
  oxygenSaturation?: number | null
  history?: string
  exam?: string
  impression?: string
  conduct?: string
  status?: DefaultStatus
  invalidatedAt?: Date | null
  appointmentId?: number
  documentId?: number

  constructor(params: TApiMedicalRecordResponse) {
    this.id = params.id
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.document = params.document
    this.pin = params.pin
    this.diastolic = params.diastolic
    this.professionalId = params.professional_id
    this.exam = params.exam
    this.professionalRoleId = params.professional_role_id
    if (params.professionalRole) this.professionalRole = new UserProfile(params.professionalRole)
    if (params.professional) this.professional = new User(params.professional)
    this.classification = params.classification
    this.heartRate = params.heart_rate
    this.respiratoryFrequency = params.respiratory_frequency
    this.bodyTemperature = params.body_temperature
    this.oxygenSaturation = params.oxygen_saturation
    this.history = params.history
    this.impression = params.impression
    this.conduct = params.conduct
    this.status = params.status
    this.invalidatedAt = params.invalidated_at
    this.appointmentId = params.appointment_id
    this.documentId = params.document_id
  }
}
