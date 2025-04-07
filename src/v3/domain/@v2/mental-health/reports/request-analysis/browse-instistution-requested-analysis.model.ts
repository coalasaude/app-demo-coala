import { PaginationModel, PaginationModelModelConstructor } from '../../../@shared/pagination.model'

import {
  InstitutionRequestedAnalysisModel,
  InstitutionRequestedAnalysisModelConstructor,
} from './institution-requested-analysis.model'

export interface BrowseInstitutionRequestedAnalysisModelConstructor {
  pagination: PaginationModelModelConstructor
  data: InstitutionRequestedAnalysisModelConstructor[]
}

export class BrowseInstitutionRequestedAnalysisModel {
  public readonly pagination: PaginationModelModelConstructor
  public readonly data: InstitutionRequestedAnalysisModel[]

  constructor(params: BrowseInstitutionRequestedAnalysisModelConstructor) {
    this.pagination = new PaginationModel(params.pagination)
    this.data = params.data.map((analysis) => {
      return new InstitutionRequestedAnalysisModel(analysis)
    })
  }
}
