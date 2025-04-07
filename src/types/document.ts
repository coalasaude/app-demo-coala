import { DefaultStatus } from './status'

export interface AppointmentDocument {
  status: DefaultStatus
  type: 'prescription' | 'exam' | 'medicalRecords'   | 'sickNote' | 'reports'
  url: string
  valid_until: string
  invalidated_at: string
  prescription_register: {
    crf: string
    name: string
    created_at: string
  }
}

export interface Document {
  id: number
  document_url: string
  bucket_name: string
  filename: string
  pin: number
}
