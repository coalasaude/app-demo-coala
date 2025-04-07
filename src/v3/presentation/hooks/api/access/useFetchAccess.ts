import { Access } from '@/v3/domain/Access'
import { TApiAccessResponse } from '@/v3/domain/api/ApiAccessResponse'
import { GetAccessApiProps, getAccess } from '@/v3/infra/services/access'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../useFetch'

/**
 * @deprecated - Use useFetchAccess from v2
 */

export const useFetchAccess = ({
  permission,
  dependentPermission,
  userId,
}: GetAccessApiProps & { userId: number }) => {
  const {
    data: response,
    isLoading,
    ...rest
  } = useFetch<TApiAccessResponse>({
    queryFn: () => {
      if (!permission) return Promise.resolve(null)
      return getAccess({ permission, dependentPermission })
    },
    queryKey: [QueryKeyEnum.ACCESS, { permission, dependentPermission, userId }],
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })

  const data = response ? new Access(response) : null

  return {
    data,
    isLoadingAccess: isLoading,
    ...rest,
  }
}
