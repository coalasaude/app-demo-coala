import { PaginationModel, PaginationModelModelConstructor } from '../../@shared/pagination.model'

import { VaccineModel, VaccineModelConstructor } from './vaccine.model'

export interface VaccineOptionsBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: VaccineModelConstructor[]
}

export class VaccineOptionsBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: VaccineModel[]

  constructor(params: VaccineOptionsBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((v) => new VaccineModel(v))
  }
}
