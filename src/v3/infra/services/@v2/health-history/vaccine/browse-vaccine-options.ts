import {
  VaccineOptionsBrowseModelConstructor,
  VaccineOptionsBrowseModel,
} from '@/v3/domain/@v2/health-history/vaccine/vaccine-options-browse.model'

import apiRequest from '../../../api'

type BrowseVaccineOptionsResponse = VaccineOptionsBrowseModelConstructor

export interface BrowseVaccineOptionsParams {
  userId: number
}

export async function browseVaccineOptions({ userId }: BrowseVaccineOptionsParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/health-history/vaccine/options',
    pathParams: { userId },
  })) as BrowseVaccineOptionsResponse

  return new VaccineOptionsBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
