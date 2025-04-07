import { DefaultStatus } from '@/types/status'

import { TDocument } from '../Document'

export interface TApiHospitalPreference {
  id: number
  name: string
  health_insurance_id: number
  created_at: string
  updated_at: string | null
}

export interface TApiHealthInsurance {
  id: number
  insurance_company: string
  code: number | null
  plan: string
  valid_until: string
  hospital_id: number
  status: DefaultStatus
  document_id: number
  user_id: number
  created_at: string
  updated_at: string | null
  url?: string
  HospitalPreference: TApiHospitalPreference[]
  document: TDocument
}
