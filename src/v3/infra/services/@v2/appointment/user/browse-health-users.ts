import {
  UserBrowseModelConstructor,
  UserBrowseModel,
} from '@/v3/domain/@v2/appointment/user-browse.model'

import apiRequest from '../../../api'

type BrowseHealthUsersResponse = UserBrowseModelConstructor

export interface BrowseAppointmentHealthUsersParams {
  searchName?: string
}

export async function browseAppointmentHealthUsers(params: BrowseAppointmentHealthUsersParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/health',
    queryParams: { name: params.searchName },
  })) as BrowseHealthUsersResponse

  return new UserBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
