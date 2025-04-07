import { PaginationModel, PaginationModelModelConstructor } from '../@shared/pagination.model'

import {
  ProfessionalReferenceModel,
  ProfessionalReferenceModelConstructor,
} from './professional-reference.model'

export interface ProfessionalReferenceBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: ProfessionalReferenceModelConstructor[]
}

export class ProfessionalReferenceBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: ProfessionalReferenceModel[]

  constructor(params: ProfessionalReferenceBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((item) => new ProfessionalReferenceModel(item))
  }
}
