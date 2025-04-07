import { PaginationModel, PaginationModelModelConstructor } from '../../@shared/pagination.model'

import {
  BrowseInstitutionalPlan,
  BrowseInstitutionalPlanConstructor,
} from './browse-institutional-plans.model'

export type BrowseInstitutionalPeiPdiPlansConstructor = {
  data?: BrowseInstitutionalPlanConstructor[]
  pagination?: PaginationModelModelConstructor
}

export class BrowseInstitutionalPeiPdiPlans {
  data?: BrowseInstitutionalPlan[]
  pagination?: PaginationModel

  constructor(params: BrowseInstitutionalPeiPdiPlansConstructor) {
    this.data = params.data?.map((comment) => new BrowseInstitutionalPlan(comment))
    this.pagination = params.pagination ? new PaginationModel(params.pagination) : undefined
  }
}
