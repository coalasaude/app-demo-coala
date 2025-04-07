import { Document } from './document'

export interface VaccineDocument {
  id: number
  created_at: string
  updated_at: string
  status: VaccineDocumentStatus
  document: Document
  Vaccine: UserVaccine[]
  url?: string
}

export interface UserVaccine {
  id: number
  vaccine_id: number
  observation: string | null
  date: string
  dosage_dose: number | null
  vaccine_manufacturer: string | null
  batch: string | null
  user_id: number
  vaccine_document_id: number
  created_at: Date
  updated_at: Date | null
  vaccine: Vaccine
}

export interface Vaccine {
  id: number
  name: string
  observation: string | null
  created_at: Date
  updated_at: Date | null
}

export enum VaccineDocumentStatus {
  PENDING = 'PENDING',
  PARTIALLY_VALIDATED = 'PARTIALLY_VALIDATED',
  FAILED = 'FAILED',
  VALIDATED = 'VALIDATED',
}
