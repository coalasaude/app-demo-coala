import { ApiPendingActionsResponse } from '@/v3/domain/api/ApiPendingActionsResponse'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { pendingActions } from '@/v3/infra/services/me/pendingActions'

import { useFetch } from '../../useFetch'

export const useFetchPendingActions = () => {
  const {
    data: response,
    isLoading,
    ...rest
  } = useFetch<ApiPendingActionsResponse>({
    queryFn: () => {
      return pendingActions()
    },
    queryKey: [QueryKeyEnum.PENDING_ACTIONS],
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })

  return {
    pendingActions: response,
    isLoadingPendingActions: isLoading,
    ...rest,
  }
}
