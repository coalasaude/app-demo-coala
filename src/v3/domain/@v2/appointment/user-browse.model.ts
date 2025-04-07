import { PaginationModel, PaginationModelModelConstructor } from '../@shared/pagination.model'

import { UserModel, UserModelConstructor } from './user.model'

export interface UserBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: UserModelConstructor[]
}

export class UserBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: UserModel[]

  constructor(params: UserBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((user) => new UserModel(user))
  }
}
