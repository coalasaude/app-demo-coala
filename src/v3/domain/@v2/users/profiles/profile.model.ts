import { capitalize } from '@brazilian-utils/brazilian-utils'

import { ProfileType } from '@/types/profile'
import { ProfilesTypeDescription } from '@/constants/profiles'


export interface ProfileModelConstructor {
  id: number
  name: string
  profileType: string
  institutionType?: string
}

export class ProfileModel {
  public readonly id: number
  public readonly name: string
  public readonly profileType: ProfileType
  public readonly institutionType?: string

  constructor(data: ProfileModelConstructor) {
    this.id = data.id
    this.name = capitalize(data.name)
    this.profileType = data.profileType as ProfileType
    this.institutionType = data.institutionType
  }


  getFormattedType(): string {
    return ProfilesTypeDescription[this.profileType]
  }
}
