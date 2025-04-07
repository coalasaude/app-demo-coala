import {
  ComplaintBrowseModel,
  ComplaintBrowseModelConstructor,
} from '@/v3/domain/@v2/appointment/complaint-browse.model'

import apiRequest from '../../../api'

type BrowseComplaintsResponse = ComplaintBrowseModelConstructor

export interface BrowseComplaintsParams {
  name?: string
  ids?: number[]
  offset?: number
  limit?: number
}

export async function browseComplaints(params: BrowseComplaintsParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/complaints',
    queryParams: params,
  })) as BrowseComplaintsResponse

  return new ComplaintBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
