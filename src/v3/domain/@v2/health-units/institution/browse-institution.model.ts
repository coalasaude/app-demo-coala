import { Pagination } from '@/v3/domain/api/organizations/ApiOrganizationResponse'

import { InstitutionModel } from './institution.model'

export type BrowseInstitutionsModelConstructor = {
  pagination: Pagination
  data: InstitutionModel[]
}

export class BrowseInstitutionsModel {
  pagination: Pagination
  data: InstitutionModel[]

  constructor({ pagination, data }: BrowseInstitutionsModelConstructor) {
    this.pagination = pagination
    this.data = data
  }
}
