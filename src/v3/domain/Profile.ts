import { ProfileType } from '@/types/profile'
import { ProfilesTypeDescription } from '@/constants/profiles'
import { capitalizeName } from '@/utils/capitalizeName'
import { Role } from '@/types/role'
import { RolesDescription } from '@/constants/roles'

import { TApiProfile } from '../infra/services/profiles/profiles'

import { InstitutionalType } from './InstitutionalType'

export type ProfileConstructorParams = TApiProfile & {
  institutionalType?: InstitutionalType
}

export class Profile {
  id: number
  name: string
  institutionTypeId?: number
  type: ProfileType
  registrationDescription?: string
  institutionalType?: InstitutionalType
  profilePermission?: { id: number; permissionId: number; profileId: number }[]

  constructor(params: ProfileConstructorParams) {
    this.id = params.id
    this.name = params.name
    this.institutionTypeId = params.institution_type_id
    this.type = params.type
    this.registrationDescription = params.registration_description
    this.institutionalType = params.institutionalType
    this.profilePermission = params.ProfilePermission?.map((profilePermission) => ({
      id: profilePermission.id,
      permissionId: profilePermission.permission_id,
      profileId: profilePermission.profile_id,
    }))
  }

  static getCoalaRoles(profiles?: Profile[]) {
    if (!profiles) return []

    return profiles?.filter((profile) => profile.type !== 'MEDICAL' && !profile.institutionTypeId)
  }

  static getMedicalRoles(profiles?: Profile[]) {
    if (!profiles) return []

    return profiles?.filter((profile) => profile.type === 'MEDICAL' && !profile.institutionTypeId)
  }

  static getInstituionsRoles(profiles?: Profile[]) {
    if (!profiles) return []

    return profiles?.filter((profile) => !!profile.institutionTypeId)
  }

  isCoalaProfile() {
    return !this.institutionTypeId
  }

  getFormattedType(): string {
    return ProfilesTypeDescription[this.type]
  }

  getCapitalizedName() {
    return capitalizeName(this.name)
  }

  getListAllPermissionsId() {
    return this.profilePermission?.map((profilePermission) => profilePermission.permissionId)
  }

  getProfileTypeName() {
    return Profile.getIsMedicalByProfileType(this.type)
      ? 'Profissional de saúde'
      : capitalizeName(this.name)
  }

  static getIsDependentByProfileName(name?: string) {
    if (!name) return false
    return name === RolesDescription[Role.STUDENT]
  }

  static getIsAdminByProfileName(name?: string) {
    if (!name) return false
    return name === RolesDescription[Role.ADMIN]
  }

  static getIsMedicalByProfileType(type?: ProfileType) {
    if (!type) return false
    return type === ProfileType.MEDICAL
  }
}
