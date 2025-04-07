export interface TApiProfile {
  id: number
  name: string
}

export interface TApiInstitutionalSettings {
  id: number
  name: string
}

export interface TApiInstitutionSettings {
  id: number
  institutionalSettingId: number
  institutionalSettings: TApiInstitutionalSettings
  institutionId: number
  value: any
  institutionSettingsProfile: TApiInstitutionSettingsProfile[]
}

export interface TApiInstitutionSettingsProfile {
  id: number
  institutionSettingId: number
  institutionSettings: TApiInstitutionSettings
  profileId: number
  profile: TApiProfile
}
