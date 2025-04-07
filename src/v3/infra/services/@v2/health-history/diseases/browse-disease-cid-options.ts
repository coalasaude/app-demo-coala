import {
  DiseaseCidOptionsBrowseModel,
  DiseaseCidOptionsBrowseModelConstructor,
} from '@/v3/domain/@v2/health-history/disease/disease-cid-options-browse.model'

import apiRequest from '../../../api'

type BrowseDiseaseCidOptionsResponse = DiseaseCidOptionsBrowseModelConstructor

export interface BrowseDiseaseCidOptionsParams {
  search?: string
}

export async function browseDiseaseCidOptions(params: BrowseDiseaseCidOptionsParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/health-history/disease-cid-options',
    queryParams: params,
  })) as BrowseDiseaseCidOptionsResponse

  return new DiseaseCidOptionsBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
