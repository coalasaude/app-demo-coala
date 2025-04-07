import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getPlanById } from '@/v3/infra/services/plan'

import { useFetch } from '../useFetch'

export const useFetchPlan = (planId: number) => {
  const { data, ...rest } = useFetch({
    queryFn: () => {
      if (!planId) return Promise.resolve(null)

      return getPlanById(planId)
    },
    queryKey: [QueryKeyEnum.PLAN, planId],
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return {
    data,
    ...rest,
  }
}
