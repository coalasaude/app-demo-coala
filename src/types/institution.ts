import { TInstitutionSettings } from '@/v2/domain/InstitutionSettings'
import { Profile } from '@/v2/domain/Profile'
import { Plan } from '@/v2/domain/Plan'

import { Address } from './address'
import { Network } from './networks'
import { DefaultStatus } from './status'

export interface Institution {
  id: number
  cnpj: string
  social_reason: string
  fantasy_name: string
  nickname: string
  telephone: string
  status: DefaultStatus
  fullname?: string
  InstitutionType: InstitutionalType
  InstitutionSettings: TInstitutionSettings[]
  institution_type_id: number
  address: Address[]
  network?: Network
  network_id?: number
  plan_id?: number
  Plan?: Plan
  created_at: string
  updated_at: string | null
}

export interface InstitutionalType {
  name: string
  id: number
  created_at: Date
  Profile: Profile[]
}
