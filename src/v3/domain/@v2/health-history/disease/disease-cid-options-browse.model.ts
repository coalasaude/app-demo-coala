import { PaginationModel, PaginationModelModelConstructor } from '../../@shared/pagination.model'

import { CidModel, CidModelConstructor } from './cid.model'

export interface DiseaseCidOptionsBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: CidModelConstructor[]
}

export class DiseaseCidOptionsBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: CidModel[]

  constructor(params: DiseaseCidOptionsBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((user) => new CidModel(user))
  }
}
