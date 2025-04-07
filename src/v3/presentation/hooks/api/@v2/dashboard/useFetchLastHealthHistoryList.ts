import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { lastHealthHistoryList } from '@/v3/infra/services/@v2/dashboard/last-health-history-list'

import { useFetch } from '../@shared/useFetch'

export type LastHealthHistoryListParams = {
  institutionId: number
}

export const useFetchLastHealthHistoryList = (params: LastHealthHistoryListParams) => {
  const { data, ...rest } = useFetch({
    queryFn: () => lastHealthHistoryList(params),
    queryKey: [QueryKeyEnum.DASHBOARD_LAST_HEALTH_HISTORY_LIST, params],
  })

  return {
    data,
    ...rest,
  }
}
