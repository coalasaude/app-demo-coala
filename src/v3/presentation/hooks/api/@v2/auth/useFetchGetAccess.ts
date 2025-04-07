import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getAccess, GetAccessApiProps } from '@/v3/infra/services/@v2/auth/get-access'

import { useFetch } from '../@shared/useFetch'

export const useFetchAccess = ({
  permission,
  dependentPermission,
  userId,
}: GetAccessApiProps & { userId: number }) => {
  const { data, isLoading, ...response } = useFetch({
    queryFn: async () =>
      getAccess({
        permission,
        dependentPermission,
      }),
    queryKey: [QueryKeyEnum.ACCESS, { permission, dependentPermission, userId }],
  })

  return {
    data,
    isLoadingAccess: isLoading,
    ...response,
  }
}
