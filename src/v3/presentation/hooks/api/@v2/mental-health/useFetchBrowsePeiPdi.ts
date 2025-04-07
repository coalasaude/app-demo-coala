import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browsePeiPdi } from '@/v3/infra/services/@v2/mental-health/learning/browse-pei-pdi'
import { PlanAIStatus } from '@/types/planAiStatus.enum'

import { useFetch } from '../@shared/useFetch'

type BrowsePeiPdiParams = {
  userId: number
}

export const useFetchBrowsePeiPdi = (params: BrowsePeiPdiParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browsePeiPdi(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI, params],
    refetchInterval: (data) =>
      data.state.data?.result?.findIndex((item) => item.planAIStatus === PlanAIStatus.PENDING) !==
        -1
        ? 10000
        : Infinity,
  })

  return {
    ...response,
    peiPdi: data?.result || [],
    count: data?.count || 0,
  }
}
