import { Address } from './address'
import { Institution } from './institution'

export interface Network {
  id: number
  cnpj: string
  social_reason: string
  fantasy_name: string
  telephone: string
  address: Address[]
  status: NetworksStatus | null
  institutions: Institution[]
  created_at: Date
  updated_at: Date | null
  institution_ids: { id: string }[]
  institution: Institution[]
}

export enum NetworksStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
