import {
  TApiListProfilePermission,
  TApiProfilePermission,
} from '../infra/services/profiles/profiles'

import { TApiProfileResponse } from './api/ApiProfileResponse'
import { InstitutionalType } from './InstitutionalType'

export type ProfileConstructorParams = TApiProfileResponse & {
  institutionalType?: InstitutionalType
}

export class Permission {
  id: number
  name: string
  description: string

  constructor(params: TApiProfilePermission) {
    this.id = params.id
    this.name = params.name
    this.description = params.description
  }
}

export class PermissionCategory {
  id: number
  name: string
  permissions: Permission[]

  constructor(params: TApiListProfilePermission) {
    this.id = params.id
    this.name = params.name
    this.permissions = params.permissions.map((item) => new Permission(item))
  }
}
