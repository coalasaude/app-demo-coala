import { useMemo } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getAppointmentCount } from '@/v3/infra/services/@v2/dashboard/dashboard'
import {
  AppointmentCountReqData,
  DashboardQueryParams,
} from '@/v3/infra/services/@v2/dashboard/dashboard.types'
import {
  AppointmentFinishedStatus,
  AppointmentFinishedStatusDescription,
} from '@/constants/appointment'

import { useFetch } from '../@shared/useFetch'

export const useFetchAppointmentCount = (params: DashboardQueryParams) => {
  const { data: response, ...rest } = useFetch<AppointmentCountReqData>({
    queryFn: () => getAppointmentCount(params),
    queryKey: [QueryKeyEnum.DASHBOARD_APPOINTMENT_COUNT, params],
  })
  const countAppointments = useMemo(() => {
    return response?.countAppointments || 0
  }, [response])

  const finishedAppointments = useMemo(() => {
    return (
      response?.finishedAppointments?.filter(
        ({ status }) => status === AppointmentFinishedStatus.CALL_CENTER,
      ).length || 0
    )
  }, [response])

  const onlyCallsPerc = useMemo(() => {
    return response?.onlyCallsPerc || 0
  }, [response])

  const finishedAppointmentStatus = useMemo(() => {
    return Object.entries(response?.finishedAppointments || {}).map(([, value]) => ({
      label: AppointmentFinishedStatusDescription[value.status],
      value: value.count,
    }))
  }, [response])

  return {
    data: response,
    countAppointments,
    finishedAppointments,
    finishedAppointmentStatus,
    onlyCallsPerc,
    ...rest,
  }
}
