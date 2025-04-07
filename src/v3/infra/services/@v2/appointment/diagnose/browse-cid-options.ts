
import { CidOptionsBrowseModel, CidOptionsBrowseModelConstructor } from '@/v3/domain/@v2/appointment/cid-options-browse.model'

import apiRequest from '../../../api'

type BrowseDiseaseCidOptionsResponse = CidOptionsBrowseModelConstructor

export interface BrowseDiseaseCidOptionsParams {
  search?: string
}

export async function browseAppointmentCidOptions(params: BrowseDiseaseCidOptionsParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/cids',
    queryParams: params,
  })) as BrowseDiseaseCidOptionsResponse

  return new CidOptionsBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
