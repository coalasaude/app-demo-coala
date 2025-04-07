import {
  LastAppointmentsModel,
  LastAppointmentsModelConstructor,
} from '@/v3/domain/@v2/dashboard/last-appointments.model'

import apiRequest from '../../api'

import { DashBoardRoutes } from './dashboard.routes'

export type LastAppointmentsResponse = LastAppointmentsModelConstructor[]

export type LastAppointmentsParams = {
  institutionId: number
}

export async function lastAppointments(params: LastAppointmentsParams) {
  const data = (await apiRequest({
    method: 'GET',
    throwError: true,
    path: DashBoardRoutes.LAST_APPOINTMENTS,
    queryParams: params,
  })) as LastAppointmentsResponse

  return data.map((prop) => new LastAppointmentsModel(prop))
}
