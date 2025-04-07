import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { readUserPlansProgress } from '@/v3/infra/services/@v2/mental-health/learning/read-user-plans-progress'

import { useFetch } from '../@shared/useFetch'

type ReadUserPlansProgressParams = {
  userId: number
}

export const useFetchReadUserPlansProgress = (params: ReadUserPlansProgressParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readUserPlansProgress(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI],
  })

  return {
    ...response,
    totalPlansProgress: data?.plansProgress,
  }
}
