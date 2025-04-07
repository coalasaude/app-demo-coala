import { Address } from '@/types/address'
import { InstitutionalType } from '@/types/institution'
import { Network } from '@/types/networks'
import { DefaultStatus } from '@/types/status'

import { Plan } from '../Plan'

import { TInstitutionSettings } from './ApiInstitutionSettings'

export interface TApiInstitutionResponse {
  id: number
  cnpj: string
  social_reason?: string
  fantasy_name: string
  nickname?: string
  telephone?: string
  status?: DefaultStatus
  InstitutionType?: InstitutionalType
  InstitutionSettings?: TInstitutionSettings[]
  institution_type_id?: number
  address?: Address[]
  network?: Network
  network_id?: number
  plan_id?: number
  Plan?: Plan
  created_at: string
  updated_at: string | null
}
