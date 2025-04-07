import { InstitutionConfigEnum } from '@/constants/institutionConfig'

import { TApiInstitutionSettings } from '../api/organizations/ApiInstitutionSettings'

import { Profile } from './Profile'

export class InstitutionSettings<T = any> {
  id: number
  name: InstitutionConfigEnum
  value: T
  profiles: Profile[]

  constructor(params: TApiInstitutionSettings) {
    this.id = params.id
    this.name = params.institutionalSettings.name as InstitutionConfigEnum
    this.value = params.value
    this.profiles = params.institutionSettingsProfile?.map(
      (institutionSettingsProfile) => new Profile(institutionSettingsProfile.profile)
    )
  }
}
