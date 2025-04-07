import { DefaultStatus } from '@/types/status'

import { User } from './User'
import { TApiUserResponse } from './api/ApiUserResponse'

export interface TApiAttachmentsResponse {
  id: number
  created_at: Date
  updated_at: Date | null
  appointment_id: number
  professional_id: number
  title: string
  status: DefaultStatus
  user: TApiUserResponse
  document_id: number
}

export class Attachment {
  id: number
  createdAt: Date
  updatedAt: Date | null
  appointmentId: number
  professionalId: number
  title: string
  status: DefaultStatus
  user: User
  documentId: number

  constructor(params: TApiAttachmentsResponse) {
    this.id = params.id
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.appointmentId = params.appointment_id
    this.professionalId = params.professional_id
    this.title = params.title
    this.status = params.status
    this.user = new User(params.user)
    this.documentId = params.document_id
  }
}
