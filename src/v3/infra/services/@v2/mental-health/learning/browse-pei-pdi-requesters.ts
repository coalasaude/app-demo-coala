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

export async function browsePeiPdiRequesters({
  institutionId,
  ...params
}: BrowseAppointmentRequestersParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: 'v2/users/:userId/mental-health/:institutionId/collaborator-responsible',
    pathParams: {
      institutionId,
    },
    queryParams: params,
  })) as BrowseRequestersResponse

  return new UserBrowseModel({
    pagination: data.pagination,
    data: data.data,
  })
}
