import { PaginationModel, PaginationModelModelConstructor } from '../../@shared/pagination.model'

import {
  UserVaccineBrowseDataModel,
  UserVaccineBrowseDataModelConstructor,
} from './user-vaccine-browse-data.model'

export interface UserVaccineBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: UserVaccineBrowseDataModelConstructor[]
}

export class UserVaccineBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: UserVaccineBrowseDataModel[]

  constructor(params: UserVaccineBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((v) => new UserVaccineBrowseDataModel(v))
  }
}
