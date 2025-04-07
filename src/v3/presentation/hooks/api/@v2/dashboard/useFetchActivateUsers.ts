import { useMemo } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getActivateUsers } from '@/v3/infra/services/@v2/dashboard/dashboard'
import { DashboardQueryParams } from '@/v3/infra/services/@v2/dashboard/dashboard.types'
import { ActivatedUsersOutput } from '@/v3/domain/organizations/Dashboard'

import { useFetch } from '../@shared/useFetch'

export const useFetchActivateUsers = (params: DashboardQueryParams) => {
  const { data: response, ...rest } = useFetch<ActivatedUsersOutput>({
    queryFn: () => getActivateUsers(params),
    queryKey: [QueryKeyEnum.DASHBOARD_ACTIVATE_USERS, params],
  })

  const data = useMemo(() => {
    return {
      allUsers: response?.allUsers || 0,
      usersActivated: response?.usersActivated || 0,
      percent: response?.percent || 0,
    }
  }, [response])

  return {
    data,
    ...rest,
  }
}
