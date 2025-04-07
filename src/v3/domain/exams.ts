import { DefaultStatus } from '@/types/status'

import { User } from './User'
import { TApiUserResponse } from './api/ApiUserResponse'

export interface TApiExamResponse {
  id: number
  created_at: Date
  updated_at: Date | null
  valid_until: number
  document: string
  pin: number
  appointment_id: number
  professional_id: number
  description: string
  recommendation: string
  status: DefaultStatus
  invalidated_at: Date | null
  professional: TApiUserResponse
  document_id: number
}

export class Exam {
  id?: number
  createdAt?: Date
  updatedAt?: Date | null
  validUntil?: number
  document?: string
  pin?: number
  appointmentId?: number
  professionalId?: number
  description?: string
  recommendation?: string
  status?: DefaultStatus
  invalidatedAt?: Date | null
  professional?: User
  documentId?: number

  constructor(params: TApiExamResponse) {
    this.id = params.id
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.validUntil = params.valid_until
    this.document = params.document
    this.pin = params.pin
    this.appointmentId = params.appointment_id
    this.professionalId = params.professional_id
    this.description = params.description
    this.recommendation = params.recommendation
    this.status = params.status
    this.invalidatedAt = params.invalidated_at
    this.professional = new User(params.professional)
    this.documentId = params.document_id
  }
}
