import { useMemo } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { DashboardQueryParams } from '@/v3/infra/services/@v2/dashboard/dashboard.types'
import { LastSixMonthsAppointmentsOutput } from '@/v3/domain/organizations/Dashboard'
import { getLastSixMonthsAppointments } from '@/v3/infra/services/@v2/dashboard/dashboard'

import { useFetch } from '../@shared/useFetch'

export const useFetchLastSixMonthsAppointments = (params: DashboardQueryParams) => {
  const { data: response, ...rest } = useFetch<LastSixMonthsAppointmentsOutput[]>({
    queryFn: () => getLastSixMonthsAppointments(params),
    queryKey: [QueryKeyEnum.DASHBOARD_LAST_SIX_MONTH_APPOINTMENTS, params],
  })

  const data = useMemo(() => {
    if (!response?.length) return []

    return response?.map((a) => {
      return {
        month: a?.month,
        count: a?.count || 0,
      }
    })
  }, [response])

  const requestedCategories = data?.map((categories) => {
    return categories.month
  })

  const requestedValues =
    data?.map((value) => {
      return value.count
    }) || []

  return {
    data,
    requestedValues,
    requestedCategories,
    ...rest,
  }
}
