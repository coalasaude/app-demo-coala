import { PaginationModel, PaginationModelModelConstructor } from '../@shared/pagination.model'

import { UserSummaryModel, UserSummaryModelConstructor } from './users-summary.model'

export interface SummaryUsersFilters {
  profiles: {
    value: number
    label: string
  }[]
}

export interface UsersBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: UserSummaryModelConstructor[]
  filters: SummaryUsersFilters
}

export class UsersBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: UserSummaryModel[]
  public readonly filters: SummaryUsersFilters

  constructor(params: UsersBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((user) => {
      return new UserSummaryModel(user)
    })
    this.filters = params.filters
  }
}
