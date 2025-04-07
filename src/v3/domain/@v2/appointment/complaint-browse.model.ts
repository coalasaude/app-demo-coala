import { PaginationModel, PaginationModelModelConstructor } from '../@shared/pagination.model'

import { ComplaintModel, ComplaintModelConstructor } from './complaint.model'

export interface ComplaintBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: ComplaintModelConstructor[]
}

export class ComplaintBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: ComplaintModel[]

  constructor(params: ComplaintBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((complaint) => new ComplaintModel(complaint))
  }
}
