import { LastUsersHealthHistoryModel } from '@/v3/domain/@v2/dashboard/last-users-health-history.model'

import apiRequest from '../../api'

import { DashBoardRoutes } from './dashboard.routes'

export type LastAppointmentsResponse = LastUsersHealthHistoryModel[]

export type LastAppointmentsParams = {
  institutionId: number
}

export async function lastHealthHistoryList(params: LastAppointmentsParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: DashBoardRoutes.LAST_HEALTH_HISTORY,
    queryParams: params,
  })) as LastAppointmentsResponse

  return data.map((prop) => new LastUsersHealthHistoryModel(prop))
}
