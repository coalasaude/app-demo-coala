import { GetUsersFilters, getUsers } from '@/v3/infra/services/user/user'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { CostCenter } from '@/v3/domain/organizations/Organization'
import { User } from '@/v3/domain/User'
import { TApiUserListResponse, TApiUserResponse } from '@/v3/domain/api/ApiUserResponse'

import { useFetch } from '../../useFetch'

interface Filters {
  limit?: number
  offset?: number
  orderBy?: GetUsersFilters['orderBy']
  direction?: GetUsersFilters['direction']

  id?: number
  orgType?: CostCenter

  name?: string
  profileId?: number
  status?: string
  email?: string
  phone?: string
  institutionId?: number
}

/**
 * @deprecated - Use useFetchBrowseUser from v2
 */
export const useFetchUsers = (filters: Filters) => {
  const orgDictionary: Record<CostCenter, Record<string, number | undefined>> = {
    [CostCenter.BRAND]: { brandId: Number(filters.id) },
    [CostCenter.INSTITUTION]: { institutionId: Number(filters.id) },
    [CostCenter.NETWORK]: { networkId: Number(filters.id) },
  }

  const { data, isLoading } = useFetch<TApiUserListResponse>({
    queryKey: [QueryKeyEnum.USER, ...Object.values(filters)],
    queryFn: () =>
      getUsers({
        ...filters,
        ...(filters.orgType && orgDictionary[filters.orgType]),
      }),
    refetchOnWindowFocus: false,
    refetchInterval: Infinity,
  })

  return {
    data: {
      results: data?.results.map((user: TApiUserResponse) => new User(user)) || [],
      count: data?.count || 0,
      filterProfiles: data?.filters.profiles || [],
    },
    isLoadingUser: isLoading,
  }
}
