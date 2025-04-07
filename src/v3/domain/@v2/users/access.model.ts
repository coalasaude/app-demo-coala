import { InstitutionModel, InstitutionModelConstructor } from './insitution.model'
import { UserModel, UserModelConstructor } from './users.model'

export interface AccessModelConstructor {
  dependents: UserModelConstructor[]
  institutions: InstitutionModelConstructor[]
  selfAccess: boolean
  isAdmin: boolean
}

export class AccessModel {
  public readonly dependents: UserModel[]
  public readonly institutions: InstitutionModel[]
  public readonly selfAccess: boolean
  public readonly isAdmin: boolean

  constructor(params: AccessModelConstructor) {
    this.selfAccess = params.selfAccess
    this.isAdmin = params.isAdmin

    this.dependents = params.dependents.map((dependent) => {
      return new UserModel({
        ...dependent,
        roles: [],
        responsible: [],
        children: [],
      })
    })

    this.institutions = params.institutions.map((institution) => {
      return new InstitutionModel(institution)
    })
  }
}
