import { PaginationModel } from '../../@shared/pagination.model'

import { SummarySummaryHealthUnitModel } from './summary-health-unit.model'

export class BrowseHealthUnitModel {
  pagination: PaginationModel
  data: SummarySummaryHealthUnitModel[]

  constructor(params: BrowseHealthUnitModel) {
    this.pagination = params.pagination
    this.data = params.data
  }
}
