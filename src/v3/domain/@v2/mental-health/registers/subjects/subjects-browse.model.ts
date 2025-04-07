import { PaginationModel, PaginationModelModelConstructor } from '../../../@shared/pagination.model'

import { MentalHealthSubjectResultBrowseModel } from './subject-result-browse.model'

export interface MentalHealthSubjectBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: MentalHealthSubjectResultBrowseModel[]
}

export class MentalHealthSubjectBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: MentalHealthSubjectResultBrowseModel[]

  constructor(params: MentalHealthSubjectBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((user) => {
      return new MentalHealthSubjectResultBrowseModel(user)
    })
  }
}
