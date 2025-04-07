import { PaginationModel, PaginationModelModelConstructor } from '../@shared/pagination.model'

import { InstitutionModel, InstitutionModelConstructor } from './institution.model'

export interface InstitutionBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: InstitutionModelConstructor[]
}

export class InstitutionBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: InstitutionModel[]

  constructor(params: InstitutionBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((institution) => new InstitutionModel(institution))
  }
}
