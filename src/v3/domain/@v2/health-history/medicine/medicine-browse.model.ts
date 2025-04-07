import { PaginationModel, PaginationModelModelConstructor } from '../../@shared/pagination.model'

import {
  MedicineBrowseDataModel,
  MedicineBrowseDataModelConstructor,
} from './medicine-browse-data.model'

export interface MedicineBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: MedicineBrowseDataModelConstructor[]
}

export class MedicineBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: MedicineBrowseDataModel[]

  constructor(params: MedicineBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((medicine) => new MedicineBrowseDataModel(medicine))
  }
}
