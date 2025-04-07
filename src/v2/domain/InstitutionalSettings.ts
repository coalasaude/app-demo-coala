import { InputType, InstitutionSettings } from './InstitutionSettings'

export interface TInstitutionalSettings {
  id: number
  name: string
  is_private: boolean
  input_type: InputType
  InstitutionSettings: InstitutionSettings[]
  InstitutionalSettingsCategory: InstitutionalSettingsCategory
  institutional_settings_category_id: number
  description: string
  has_profile: boolean
  is_product: boolean
}

export class InstitutionalSettings {
  id: number
  name: string
  description: string
  isPrivate: boolean
  inputType: InputType
  institutionalSettingsCategory: InstitutionalSettingsCategory
  institutionalSettingsCategoryId: number
  hasProfile: boolean
  isProduct: boolean
  institutionSettings?: InstitutionSettings[]

  constructor(data: TInstitutionalSettings) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.isPrivate = data.is_private
    this.inputType = data.input_type
    this.hasProfile = data.has_profile
    this.institutionalSettingsCategory = data.InstitutionalSettingsCategory
    this.institutionalSettingsCategoryId = data.institutional_settings_category_id
    this.institutionSettings = data.InstitutionSettings
    this.isProduct = data.is_product
  }
}

export interface TInstitutionalSettingsCategory {
  id: number
  name: string
  institutionalSettings: InstitutionalSettings
}

export class InstitutionalSettingsCategory {
  id: number
  name: string
  institutionalSettings: InstitutionalSettings

  constructor(data: TInstitutionalSettingsCategory) {
    this.id = data.id
    this.name = data.name
    this.institutionalSettings = data.institutionalSettings
  }
}
