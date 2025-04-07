import { Address } from './address'
import { Institution } from './institution'
import { DefaultStatus } from './status'

export interface HospitalPreference {
  id: number
  name: string
  email: string
  telephone: string
  status: DefaultStatus
  hospitalPreferenceType: HospitalPreferenceType
  hospital_preference_type_id: number
  address: Address[]
  institution: Institution
  institution_id: number
  created_at: string
  updated_at: string | null
}

export interface HospitalPreferenceType {
  name: string
  id: number
  created_at: Date
}
