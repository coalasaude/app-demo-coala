import api from '../../api'
import {
  AverageTimeOutput,
  CourseUsersOutput,
  HealthHistoryFilledOutput,
  LastSixMonthsAppointmentsOutput,
  RankComplaintAppointmentOutput,
  RankPatientAppointmentOutput,
  ActivatedUsersOutput,
} from '../../../../domain/organizations/Dashboard'

import { DashBoardRoutes } from './dashboard.routes'
import {
  AppointmentCountReqData,
  AppointmentPerHourReqData,
  DashboardQueryParams,
} from './dashboard.types'

type ApiResponse<T> = Promise<T>

const fetch = async <T>(route: string, { institutionId }: DashboardQueryParams): ApiResponse<T> => {
  const response = await api({
    path: route,
    method: 'GET',
    useApiFilters: true,
    queryParams: { institutionId },
  })

  return response as T
}

export const getAppointmentCount = (params: DashboardQueryParams) =>
  fetch<AppointmentCountReqData>(DashBoardRoutes.APPOINTMENT_COUNT, params)

export const getActivateUsers = (params: DashboardQueryParams) =>
  fetch<ActivatedUsersOutput>(DashBoardRoutes.ACTIVATED_USERS, params)

export const getAppointmentPerHour = (params: DashboardQueryParams) =>
  fetch<AppointmentPerHourReqData[]>(DashBoardRoutes.APPOINTMENT_PER_HOUR, params)

export const getAverageTimeAppointments = (params: DashboardQueryParams) =>
  fetch<AverageTimeOutput>(DashBoardRoutes.AVERAGE_TIME_APPOINTMENTS, params)

export const getCourseUsers = (params: DashboardQueryParams) =>
  fetch<CourseUsersOutput[]>(DashBoardRoutes.COURSE_USERS, params)

export const getHealthHistoryFilled = (params: DashboardQueryParams) =>
  fetch<HealthHistoryFilledOutput>(DashBoardRoutes.FILLED_HEALTH_HISTORY, params)

export const getLastSixMonthsAppointments = (params: DashboardQueryParams) =>
  fetch<LastSixMonthsAppointmentsOutput[]>(DashBoardRoutes.LAST_SIX_MONTHS_APPOINTMENT, params)

export const getRankComplaint = (params: DashboardQueryParams) =>
  fetch<RankComplaintAppointmentOutput[]>(DashBoardRoutes.RANK_COMPLAINTS, params)

export const getRankPatient = (params: DashboardQueryParams) =>
  fetch<RankPatientAppointmentOutput[]>(DashBoardRoutes.RANK_PATIENT, params)
