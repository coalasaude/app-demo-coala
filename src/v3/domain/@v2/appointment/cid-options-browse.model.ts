
import { PaginationModel, PaginationModelModelConstructor } from '../@shared/pagination.model'

import { CidOptionsModel, CidOptionsModelConstructor } from './cid-options.model'

export interface CidOptionsBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: CidOptionsModelConstructor[]
}

export class CidOptionsBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: CidOptionsModel[]

  constructor(params: CidOptionsBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((user) => new CidOptionsModel(user))
  }
}
