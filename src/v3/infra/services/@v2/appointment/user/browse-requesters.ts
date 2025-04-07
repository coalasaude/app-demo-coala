import {
  UserBrowseModelConstructor,
  UserBrowseModel,
} from '@/v3/domain/@v2/appointment/user-browse.model'

import apiRequest from '../../../api'

type BrowseRequestersResponse = UserBrowseModelConstructor

export interface BrowseAppointmentRequestersParams {
  institutionId: number
  searchName?: string
  offset?: number
  limit?: number
}

export async function browseAppointmentRequesters(params: BrowseAppointmentRequestersParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/requesters',
    queryParams: params,
  })) as BrowseRequestersResponse

  return new UserBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
