import { PaginationModel, PaginationModelModelConstructor } from '../../@shared/pagination.model'

import { AllergyModel, AllergyModelConstructor } from './allergy.model'

export interface AllergyBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: AllergyModelConstructor[]
}

export class AllergyBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: AllergyModel[]

  constructor(params: AllergyBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((user) => new AllergyModel(user))
  }
}
