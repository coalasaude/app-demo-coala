import { PaginationModel, PaginationModelModelConstructor } from '../../@shared/pagination.model'

import { CidModel, CidModelConstructor } from './cid.model'

export interface SickNoteCidOptionsBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: CidModelConstructor[]
}

export class SickNoteCidOptionsBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: CidModel[]

  constructor(params: SickNoteCidOptionsBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((user) => new CidModel(user))
  }
}
