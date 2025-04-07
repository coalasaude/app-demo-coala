import { useMemo } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { DashboardQueryParams } from '@/v3/infra/services/@v2/dashboard/dashboard.types'
import { HealthHistoryFilledOutput } from '@/v3/domain/organizations/Dashboard'
import { getHealthHistoryFilled } from '@/v3/infra/services/@v2/dashboard/dashboard'

import { useFetch } from '../@shared/useFetch'

export const useFetchHealthHistoryFilled = (params: DashboardQueryParams) => {
  const { data: response, ...rest } = useFetch<HealthHistoryFilledOutput>({
    queryFn: () => getHealthHistoryFilled(params),
    queryKey: [QueryKeyEnum.DASHBOARD_HEALTH_HISTORY_FILLED, params],
  })

  const data = useMemo(() => {
    const allUsers = response?.allUsers ?? 0
    const usersFilled = response?.usersFilled ?? 0
    const calc = ((usersFilled / allUsers) * 100).toFixed(2)
    const percent = allUsers > 0 ? Number(calc) : 0

    return {
      allUsers,
      usersFilled,
      percent,
    }
  }, [response])

  return {
    data,
    ...rest,
  }
}
