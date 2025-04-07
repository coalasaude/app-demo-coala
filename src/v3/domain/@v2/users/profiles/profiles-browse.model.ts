import { PaginationModel, PaginationModelModelConstructor } from '../../@shared/pagination.model'

import { ProfileModel, ProfileModelConstructor } from './profile.model'


export interface ProfileBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: ProfileModelConstructor[]
}

export class ProfileBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: ProfileModel[]

  constructor(params: ProfileBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((item) => new ProfileModel(item))
  }
}
