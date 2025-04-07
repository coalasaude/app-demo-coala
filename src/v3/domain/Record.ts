import { RecordStatus, TMentalHealthRecord } from './api/ApiMentalHealthRecord'
import { Document } from './Document'

export class Record {
  id: number
  status: RecordStatus = 'INVALID'
  description: string
  createdAt: string
  documentId?: number
  document?: Document
  url: string

  constructor(params: TMentalHealthRecord) {
    this.id = params.id
    this.status = params.status
    this.description = params.description
    this.createdAt = params.createdAt
    this.documentId = params.document_id
    this.document = params.document ? new Document(params.document) : undefined
    this.url = params.url
  }
}
