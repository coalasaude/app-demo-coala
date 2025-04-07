import { DefaultStatus } from './status'

export interface HealthInsurance {
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
  HospitalPreference: HospitalPreference[]
}

export interface HospitalPreference {
  id: number
  name: string
  health_insurance_id: number
  created_at: string
  updated_at: string | null
}
