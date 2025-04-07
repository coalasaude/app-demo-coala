import {
  UserBrowseModelConstructor,
  UserBrowseModel,
} from '@/v3/domain/@v2/appointment/user-browse.model'

import apiRequest from '../../../api'

type BrowsePatientsResponse = UserBrowseModelConstructor

export interface BrowseAppointmentPatientsParams {
  institutionId: number
  searchName?: string
  offset?: number
  limit?: number
}

export async function browseAppointmentPatients(params: BrowseAppointmentPatientsParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/appointments/patients',
    queryParams: params,
  })) as BrowsePatientsResponse

  return new UserBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
