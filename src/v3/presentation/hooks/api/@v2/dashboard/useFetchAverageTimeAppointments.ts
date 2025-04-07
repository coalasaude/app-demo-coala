import { useMemo } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getAverageTimeAppointments } from '@/v3/infra/services/@v2/dashboard/dashboard'
import { DashboardQueryParams } from '@/v3/infra/services/@v2/dashboard/dashboard.types'
import { AverageTimeOutput } from '@/v3/domain/organizations/Dashboard'

import { useFetch } from '../@shared/useFetch'

export const useFetchAverageTimeAppointments = (params: DashboardQueryParams) => {
  const { data: response, ...rest } = useFetch<AverageTimeOutput>({
    queryFn: () => getAverageTimeAppointments(params),
    queryKey: [QueryKeyEnum.DASHBOARD_AVERAGE_TIME_APPOINTMENTS, params],
  })

  const averageDurationTime = useMemo(() => {
    return response?.averageDurationTime
  }, [response])

  const averageWaitingTime = useMemo(() => {
    return response?.averageWaitingTime
  }, [response])

  return {
    data: response,
    averageDurationTime,
    averageWaitingTime,
    ...rest,
  }
}
