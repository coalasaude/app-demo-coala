import { PaginationModel, PaginationModelModelConstructor } from '../@shared/pagination.model'

import { HealthInsuranceModel, HealthInsuranceModelConstructor } from './health-insurance.model'

export interface HealthInsuranceBrowseModelConstructor {
  pagination: PaginationModelModelConstructor
  data: HealthInsuranceModelConstructor[]
}

export class HealthInsuranceBrowseModel {
  public readonly pagination: PaginationModel
  public readonly data: HealthInsuranceModel[]

  constructor(params: HealthInsuranceBrowseModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((item) => new HealthInsuranceModel(item))
  }
}
