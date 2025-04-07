import { Institution } from './Institution'
import { InstitutionalSettings } from './InstitutionalSettings'
import { Profile } from './Profile'

export enum InputType {
  NUMBER = 'NUMBER',
  CURRENCY = 'CURRENCY',
  DATE = 'DATE',
  DATE_RANGE = 'DATE_RANGE',
  PRODUCT = 'PRODUCT',
  PAYMENT = 'PAYMENT',
}

export interface TInstitutionSettings {
  id: number
  institutional_setting_id: number
  institutionalSettings: InstitutionalSettings
  institution_id: number
  institution: Institution
  value: JSON
  institutionSettingsProfile: TInstitutionSettingsProfile[]
}

export interface TInstitutionSettingsProfile {
  id: number
  institution_setting_id: number
  institutionSettings: InstitutionSettings
  profile_id: number
  profile: Profile
}

export class InstitutionSettings {
  id: number
  institutionalSettingId: number
  institutionalSettings?: InstitutionalSettings
  institutionId: number
  institution?: Institution
  value: JSON
  institutionSettingsProfile?: InstitutionSettingsProfile[]

  constructor(data: TInstitutionSettings) {
    this.id = data.id
    this.institutionalSettingId = data.institutional_setting_id
    this.institutionalSettings = data.institutionalSettings
    this.institutionId = data.institution_id
    this.institution = data.institution
    this.value = data.value
    this.institutionSettingsProfile = data.institutionSettingsProfile?.map(
      (setting) => new InstitutionSettingsProfile(setting)
    )
  }
}

export class InstitutionSettingsProfile {
  id: number
  institutionSettingId: number
  institutionSettings?: InstitutionSettings
  profileId: number
  profile?: Profile

  constructor(data: TInstitutionSettingsProfile) {
    this.id = data.id
    this.institutionSettingId = data.institution_setting_id
    this.institutionSettings = data.institutionSettings
    this.profileId = data.profile_id
    this.profile = data.profile
  }
}
