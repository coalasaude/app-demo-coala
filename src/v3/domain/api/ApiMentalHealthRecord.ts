import { TDocument } from '../Document'

export type RecordStatus = 'EXTERNAL' | 'INTERNAL' | 'INVALID'

export enum RecordStatusEnum {
  EXTERNAL = 'EXTERNO',
  INTERNAL = 'INTERNO',
  INVALID = 'INVALIDO',
}

export interface TMentalHealthRecord {
  id: number
  status: RecordStatus
  description: string
  createdAt: string
  document_id: number
  document: TDocument
  url: string
}
