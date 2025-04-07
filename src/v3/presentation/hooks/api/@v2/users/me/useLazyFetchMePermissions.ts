import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { getMePermissions } from '@/v3/infra/services/@v2/auth/get-permissions'

import { useLazyFetch } from '../../@shared/useLazyFetch'

export const useLazyFetchMePermissions = () => {
  const { setAuth } = useAuth()
  const { fetch, isLoading } = useLazyFetch({
    queryFn: () => getMePermissions(),
    queryKey: [QueryKeyEnum.ME_PERMISSIONS],
    onSuccess(data) {
      setAuth({ permissions: data })
    },
  })

  return {
    fetch,
    isLoading,
  }
}
