import { Institution } from './Institution'
import { User } from './User'
import { TApiAccessResponse } from './api/ApiAccessResponse'

export class Access {
  dependents: User[]
  institutions: Institution[]
  selfAccess: boolean
  isAdmin: boolean
  profileNames: Record<number, string[]>

  constructor(params: TApiAccessResponse) {
    this.selfAccess = params.self_access
    this.isAdmin = params.is_admin
    this.profileNames = params.profilesNames
    this.dependents = params.dependents?.map((dependent) => {
      return new User(dependent)
    })

    this.institutions = params.institutions?.map((institution) => {
      return new Institution(institution)
    })
  }

  static getFormattedProfilesNames(param?: string[]): string {
    return param?.join(', ') || ''
  }
}
