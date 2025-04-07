import { DefaultStatus } from '@/types/status'

import { User } from './User'
import { TUserProfile, UserProfile } from './UserProfile'
import { TApiUserResponse } from './api/ApiUserResponse'

export interface TApiReportResponse {
  id: number
  created_at: Date
  updated_at: Date | null
  document: string
  pin: number
  appointment_id: number
  professional_id: number
  professional_role_id: number
  professional: TApiUserResponse
  professionalRole: TUserProfile
  title: string
  body: string
  status: DefaultStatus
  invalidated_at: Date | null
  document_id: number
}

export class Report {
  id: number
  createdAt: Date
  updatedAt: Date | null
  document: string
  pin: number
  appointmentId: number
  professionalId: number
  professionalRoleId: number
  professional: User
  professionalRole: UserProfile
  title: string
  body: string
  status: DefaultStatus
  invalidatedAt: Date | null
  documentId: number

  constructor(params: TApiReportResponse) {
    this.id = params.id
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.document = params.document
    this.pin = params.pin
    this.appointmentId = params.appointment_id
    this.professionalId = params.professional_id
    this.professionalRoleId = params.professional_role_id
    this.professional = new User(params.professional)
    this.professionalRole = new UserProfile(params.professionalRole)
    this.title = params.title
    this.body = params.body
    this.status = params.status
    this.invalidatedAt = params.invalidated_at
    this.documentId = params.document_id
  }
}
