import { BrowseHealthUnitModel } from '@/v3/domain/@v2/health-units/health-unit/browse-health-unit.model'
import { PaginationModel } from '@/v3/domain/@v2/@shared/pagination.model'
import { SummarySummaryHealthUnitModel } from '@/v3/domain/@v2/health-units/health-unit/summary-health-unit.model'
import { DefaultStatus } from '@/types/status'
import { HealthUnitType } from '@/v3/domain/api/ApiHealthUnitResponse'

import apiRequest from '../../../api'

export type BrowseHealthUnitParams = {
  limit: number
  offset: number
  name?: string
  neighborhood?: string
  state?: string
  city?: string
  status?: string
}

type BrowseHealthUnitResponse = {
  pagination: {
    total: number
    limit: number
    offset: number
  }
  data: {
    id: number
    status: DefaultStatus
    type: HealthUnitType
    name: string
    contact: {
      phone: string
      email: string
    }
    company: {
      companyName: string
      cnpj: string
    }
  }[]
}

export async function browseHealthUnit(queryParams: BrowseHealthUnitParams) {
  const data = (await apiRequest<BrowseHealthUnitResponse>({
    method: 'GET',
    throwError: true,
    path: 'v2/health-units',
    queryParams,
  })) as BrowseHealthUnitResponse

  return new BrowseHealthUnitModel({
    pagination: new PaginationModel(data.pagination),
    data: data.data.map((item) => new SummarySummaryHealthUnitModel(item)),
  })
}
