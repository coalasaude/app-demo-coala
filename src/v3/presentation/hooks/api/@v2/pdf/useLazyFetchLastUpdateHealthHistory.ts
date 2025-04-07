import { useMemo } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getLastUpdateLastHistory } from '@/v3/infra/services/@v2/pdf/get-last-update-health-history'

import { useLazyFetch } from '../@shared/useLazyFetch'

export const useLazyFetchLastUpdateHealthHistory = () => {
  const queryKey = useMemo(() => [QueryKeyEnum.LAST_UPDATE_HEALTH_HISTORY], [])

  const { fetch, isLoading } = useLazyFetch({
    queryFn: getLastUpdateLastHistory,
    queryKey,
  })

  return {
    fetch,
    isLoading,
  }
}
