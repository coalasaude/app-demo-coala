import { DefaultStatus } from './status'
import { User } from './user'
import { UserProfile } from './userProfile'

export interface MedicalRecord {
  id: number
  created_at: Date
  updated_at: Date | null
  document: string
  pin: number
  professional_id: number
  professional_role_id: number
  professionalRole: UserProfile
  professional: User
  classification: MedicalRecordClassification
  blood_pressure: number | null
  heart_rate: number | null
  respiratory_frequency: number | null
  body_temperature: number | null
  oxygen_saturation: number | null
  history: string
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
