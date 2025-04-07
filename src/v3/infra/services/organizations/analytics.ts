import { Dayjs } from 'dayjs'

import {
  AppointmentConclusionReqData,
  AppointmentReqData,
  AvarageTimeReqData,
  ComplaintReqData,
  PercentageFill,
  RankingReqData,
} from '@/types/analytics'

import apiRequest from '../api'

export type DateState = {
  startDate: Dayjs | null
  endDate: Dayjs | null
}

export function getAppointmentAnalytics(orgParams: Record<string, string | number>) {
  return apiRequest<AppointmentReqData>({
    path: 'cost-center/analytics/appointment',
    method: 'GET',
    useApiFilters: true,
    queryParams: orgParams,
  })
}

export function getConclusionAnalytics(
  orgParams: Record<string, string | number>,
  dateFilter: DateState
) {
  return apiRequest<AppointmentConclusionReqData>({
    path: 'cost-center/analytics/conclusion',
    method: 'GET',
    useApiFilters: true,
    queryParams: {
      dateFrom: dateFilter?.startDate,
      dateTo: dateFilter?.endDate,
      ...orgParams,
    },
  })
}

export function getComplaintAnalytics(
  orgParams: Record<string, string | number>,
  dateFilter: DateState
) {
  return apiRequest<ComplaintReqData>({
    path: 'cost-center/analytics/complaint',
    method: 'GET',
    useApiFilters: true,
    queryParams: {
      dateFrom: dateFilter?.startDate,
      dateTo: dateFilter?.endDate,
      ...orgParams,
    },
  })
}

export function getRankingAnalytics(
  orgParams: Record<string, string | number>,
  dateFilter: DateState
) {
  return apiRequest<RankingReqData>({
    path: 'cost-center/analytics/ranking',
    method: 'GET',
    useApiFilters: true,
    queryParams: {
      dateFrom: dateFilter?.startDate,
      dateTo: dateFilter?.endDate,
      ...orgParams,
    },
  })
}

export function getAverageTimeAnalytics(
  orgParams: Record<string, string | number>,
  dateFilter: DateState
) {
  return apiRequest<AvarageTimeReqData>({
    path: 'cost-center/analytics/average-time',
    method: 'GET',
    useApiFilters: true,
    queryParams: {
      dateFrom: dateFilter?.startDate,
      dateTo: dateFilter?.endDate,
      ...orgParams,
    },
  })
}

export function getPercentsAnalytics(
  orgParams: Record<string, string | number>,
  dateFilter: DateState,
  id: number
) {
  return apiRequest<PercentageFill>({
    path: 'cost-center/analytics/conclusion/' + id,
    method: 'GET',
    useApiFilters: true,
    queryParams: {
      dateFrom: dateFilter?.startDate,
      dateTo: dateFilter?.endDate,
      ...orgParams,
    },
  })
}
