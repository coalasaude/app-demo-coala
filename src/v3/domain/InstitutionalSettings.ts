import { TInstitutionSettings } from './api/ApiInstitutionSettings'

export interface TInstitutionalSettings {
  id: number
  name: string
  is_private: boolean
  institutionSettings: TInstitutionSettings
  description: string
  has_profile: boolean
  is_product: boolean
}

export class InstitutionalSettings {
  id: number
  name: string
  description: string
  isPrivate: boolean
  hasProfile: boolean
  isProduct: boolean
  institutionSettings?: TInstitutionSettings

  constructor(data: TInstitutionalSettings) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.isPrivate = data.is_private
    this.hasProfile = data.has_profile
    this.institutionSettings = data.institutionSettings
    this.isProduct = data.is_product
  }
}
