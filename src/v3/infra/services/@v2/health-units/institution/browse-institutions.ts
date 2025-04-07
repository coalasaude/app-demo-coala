import { PaginationModel } from '@/v3/domain/@v2/@shared/pagination.model'
import { BrowseInstitutionsModel } from '@/v3/domain/@v2/health-units/institution/browse-institution.model'
import { InstitutionModel } from '@/v3/domain/@v2/health-units/institution/institution.model'

import apiRequest from '../../../api'

export type BrowseInstitutionsParams = {
  healthUnitId?: number
  limit?: number
  offset?: number
  name?: string
  neighborhood?: string
}

type BrowseInstitutionResponse = {
  pagination: {
    total: number
    limit: number
    offset: number
  }
  data: {
    id: number
    name: string
  }[]
}

export async function browseInstitutions(params: BrowseInstitutionsParams) {
  const data = (await apiRequest<BrowseInstitutionResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/health-units/:healthUnitId/institutions',
    pathParams: params,
    queryParams: {
      limit: params.limit,
      offset: params.offset,
      name: params.name,
      neighborhood: params.neighborhood,
    },
  })) as BrowseInstitutionResponse

  return new BrowseInstitutionsModel({
    pagination: new PaginationModel(data.pagination),
    data: data.data.map((item) => new InstitutionModel(item)),
  })
}
