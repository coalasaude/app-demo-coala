import { PaginationModel, PaginationModelModelConstructor } from '../../@shared/pagination.model'

import { DiseaseModel, DiseaseModelConstructor } from './disease.model'

export interface DiseaseBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: DiseaseModelConstructor[]
}

export class DiseaseBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: DiseaseModel[]

  constructor(params: DiseaseBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((disease) => new DiseaseModel(disease))
  }
}
