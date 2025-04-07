import { DefaultStatus } from '@/types/status'

import { Cid, TApiCidResponse } from './diagnose'
import { User } from './User'
import { TApiUserResponse } from './api/ApiUserResponse'

export interface TApiSickNoteResponse {
  id: number
  created_at: Date
  updated_at: Date | null
  valid_until: Date
  document: string
  pin: number
  appointment_id: number
  professional_id: number
  professional_role_id: number
  professional: TApiUserResponse
  body: string
  cid: TApiCidResponse | null
  status: DefaultStatus
  invalidated_at: Date | null
  document_id: number
}

export class SickNote {
  id?: number
  createdAt?: Date
  updatedAt?: Date | null
  validUntil?: Date
  document?: string
  pin?: number
  appointmentId?: number
  professionalId?: number
  professionalRoleId?: number
  professional?: User
  body?: string
  cid?: Cid
  status?: DefaultStatus
  invalidatedAt?: Date | null
  documentId?: number

  constructor(params: TApiSickNoteResponse) {
    this.id = params.id
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.validUntil = params.valid_until
    this.document = params.document
    this.pin = params.pin
    this.appointmentId = params.appointment_id
    this.professionalId = params.professional_id
    this.professionalRoleId = params.professional_role_id
    this.professional = new User(params.professional)
    this.body = params.body
    if (params.cid) this.cid = new Cid(params.cid)
    this.status = params.status
    this.invalidatedAt = params.invalidated_at
    this.documentId = params.document_id
  }
}
