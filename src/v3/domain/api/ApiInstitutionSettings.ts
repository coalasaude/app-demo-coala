import { Institution } from '../Institution'
import { TInstitutionalSettings } from '../InstitutionalSettings'
import { Profile } from '../Profile'

export interface TInstitutionSettings {
  id: number
  institutional_setting_id: number
  institutionalSettings: TInstitutionalSettings
  institution_id: number
  institution: Institution
  value: JSON
  InstitutionSettingsProfile: TInstitutionSettingsProfile[]
}

export interface TInstitutionSettingsProfile {
  id: number
  institution_setting_id: number
  institutionSettings: TInstitutionSettings
  profile_id: number
  profile: Profile
}
