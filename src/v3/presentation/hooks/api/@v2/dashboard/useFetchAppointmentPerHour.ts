import { useMemo } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getAppointmentPerHour } from '@/v3/infra/services/@v2/dashboard/dashboard'
import {
  AppointmentPerHourReqData,
  DashboardQueryParams,
} from '@/v3/infra/services/@v2/dashboard/dashboard.types'

import { useFetch } from '../@shared/useFetch'

export const useFetchAppointmentPerHour = (params: DashboardQueryParams) => {
  const { data: response, ...rest } = useFetch<AppointmentPerHourReqData[]>({
    queryFn: () => getAppointmentPerHour(params),
    queryKey: [QueryKeyEnum.DASHBOARD_APPOINTMENT_PER_HOUR, params],
  })

  const data = useMemo(() => {
    if (!response?.length) return []

    return response?.map((item) => ({
      label: `${item.hour}:00`,
      value: item.count,
    }))
  }, [response])

  const label = data?.map((data) => data.label) || []
  const value = data?.map((data) => data.value) || []

  return {
    data: {
      label,
      value,
    },
    ...rest,
  }
}
