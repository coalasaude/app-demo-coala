import { DefaultStatus } from '@/types/status'
import { formatDate } from '@/utils/formatDate'

import { Document } from './Document'
import { TApiHealthInsurance } from './api/TApiHealthInsurance'

export class HealthInsurance {
  id: number
  insuranceCompany?: string
  code?: number | null
  plan?: string
  validUntil?: string
  hospitalId?: number
  status?: DefaultStatus
  documentId?: number
  userId?: number
  createdAt?: string
  updatedAt?: string | null
  document?: Document | null
  url?: string

  constructor(params: TApiHealthInsurance) {
    this.id = params.id
    this.insuranceCompany = params.insurance_company
    this.code = params.code
    this.plan = params.plan
    this.validUntil = params.valid_until
    this.hospitalId = params.hospital_id
    this.status = params.status
    this.documentId = params.document_id
    this.userId = params.user_id
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.url = params.url

    if (params.document) this.document = new Document(params.document)
    
  }

  getValidDate() {
    if (!this.validUntil) return ''
    return formatDate(this.validUntil)
  }
}
