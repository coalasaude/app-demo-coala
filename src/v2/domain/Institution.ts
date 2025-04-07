import { Address } from '@/types/address'
import { InstitutionalType } from '@/types/institution'
import { Network } from '@/types/networks'
import { DefaultStatus } from '@/types/status'

export type TInstitution = Partial<{
  id: number
  cnpj: string
  socialReason: string
  fantasyName: string
  telephone: string
  status: DefaultStatus
  InstitutionType: InstitutionalType
  institutionTypeId: number
  address: Address[]
  network?: Network
  networkId?: number
  createdAt: string
  updatedAt: string | null
}>

export class Institution {
  data: TInstitution
  constructor(params: TInstitution) {
    this.data = params
  }
}
