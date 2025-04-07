import { SickNoteCidOptionsBrowseModel, SickNoteCidOptionsBrowseModelConstructor } from '@/v3/domain/@v2/health-history/sick-note/sick-note-cid-options-browse.model'

import apiRequest from '../../../api'

type BrowseDiseaseCidOptionsResponse = SickNoteCidOptionsBrowseModelConstructor

export interface BrowseDiseaseCidOptionsParams {
  search?: string
}

export async function browseSickNoteCidOptions(params: BrowseDiseaseCidOptionsParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/health-history/sick-note-cid-options',
    queryParams: params,
  })) as BrowseDiseaseCidOptionsResponse

  return new SickNoteCidOptionsBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
