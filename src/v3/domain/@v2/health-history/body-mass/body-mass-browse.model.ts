import { PaginationModel, PaginationModelModelConstructor } from '../../@shared/pagination.model'

import { BodyMassModel, BodyMassModelConstructor } from './body-mass.model'

export interface BodyMassBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: BodyMassModelConstructor[]
}

export class BodyMassBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: BodyMassModel[]

  constructor(params: BodyMassBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((sickNote) => new BodyMassModel(sickNote))
  }
}
