import { capitalize } from '@brazilian-utils/brazilian-utils'

import { ProfileType } from '@/types/profile'
import { capitalizeName } from '@/utils/capitalizeName'

import { PermissionModel } from '../permission.model'

export interface ProfileModelConstructor {
  id?: number
  name: string
  type: ProfileType
  registrationDescription?: string
  permissions?: PermissionModel[]
}

export class ProfileModel {
  public readonly id?: number
  public readonly name: string
  public readonly type: ProfileType
  public readonly registrationDescription?: string
  public readonly permissions?: PermissionModel[]

  constructor(data: ProfileModelConstructor) {
    this.id = data.id
    this.name = data.name
    this.type = data.type
    this.registrationDescription = data.registrationDescription
    this.permissions = data.permissions?.map((permission) => new PermissionModel(permission))
  }

  IsMedicalProfile() {
    return this.type === ProfileType.MEDICAL
  }

  get IsManager() {
    return this.name.includes('Gestor')
  }

  get IsCollaborator() {
    return this.name.includes('Colaborador')
  }

  getProfileTypeName() {
    return this.IsMedicalProfile() ? 'Profissional de saúde' : capitalize(this.name)
  }

  getCapitalizedName() {
    return capitalizeName(this.name)
  }
}
