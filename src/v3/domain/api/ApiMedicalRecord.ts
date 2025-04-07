import { TUserProfile } from '../UserProfile'
import { MedicalRecordClassification } from '../medical-record'

import { DefaultStatus } from './ApiCourseResponse'
import { TApiUserResponse } from './ApiUserResponse'

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

export type MedicalRecordForm = {
  classification: string
  diastolic: number
  systolic: number
  heart_rate: number
  respiratory_frequency: number
  body_temperature: number
  oxygen_saturation: number
  history: string
  exam: string
  impression: string
  conduct: string
  certification_password: string
  appointment_id: number
}

export type CreateMedicalRecordProps = {
  appointmentId: number
  body: MedicalRecordForm
}
