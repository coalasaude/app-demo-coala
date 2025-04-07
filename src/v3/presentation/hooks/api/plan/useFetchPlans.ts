import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getPlans } from '@/v3/infra/services/plan'
import { TApiPlansResponse } from '@/v3/domain/api/TApiPlansResponse'

import { useFetch } from '../../useFetch'

export const useFetchPlans = () => {
  const { data, ...rest } = useFetch<TApiPlansResponse>({
    queryFn: () => getPlans(),
    queryKey: [QueryKeyEnum.PLAN],
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return {
    data,
    ...rest,
  }
}
