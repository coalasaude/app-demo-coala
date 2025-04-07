import { Address } from '@/types/address'
import { InstitutionalType } from '@/types/institution'
import { Network } from '@/types/networks'
import { DefaultStatus } from '@/types/status'

import { InstitutionalSettings } from './InstitutionalSettings'
import { TApiInstitutionResponse } from './api/ApiInstitutionResponse'

export class Institution {
  id?: number
  cnpj?: string
  socialReason?: string
  fantasyName?: string
  nickname?: string
  telephone?: string
  status?: DefaultStatus
  InstitutionType?: InstitutionalType
  institutionTypeId?: number
  address?: Address[]
  network?: Network
  networkId?: number
  createdAt?: string
  updatedAt?: string | null
  institutionSettings?: InstitutionalSettings[]

  constructor(params: TApiInstitutionResponse) {
    if (!params) return
    this.id = params.id
    this.cnpj = params.cnpj
    this.socialReason = params.social_reason
    this.fantasyName = params.fantasy_name
    this.nickname = params.nickname
    this.telephone = params.telephone
    this.status = params.status
    this.InstitutionType = params.InstitutionType
    this.institutionTypeId = params.institution_type_id
    this.address = params.address
    this.network = params.network
    this.networkId = params.network_id
    this.createdAt = params.created_at
    this.updatedAt = params.updated_at
    this.institutionSettings = params.InstitutionSettings?.map((institutionSettings) => {
      return new InstitutionalSettings(institutionSettings.institutionalSettings)
    })
  }

  getFantasyNameWithCnpj() {
    return `${this.fantasyName} (${this.cnpj ? this.cnpj : 'CNPJ não cadastrado'})`
  }

  getFantasyName() {
    return !!this.fantasyName ? this.fantasyName : 'Coala Saúde'
  }

  getName() {
    return this.fantasyName || 'Empresa'
  }
}
