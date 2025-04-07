import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseMentalHealthBehavior,
  BrowseMentalHealthBehaviorParams,
} from '@/v3/infra/services/@v2/mental-health/registers/behavior/browse-behavior'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchBrowseMentalHealthBehavior = (params: BrowseMentalHealthBehaviorParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseMentalHealthBehavior(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REGISTER_BEHAVIOR, params.userId],
  })

  return {
    ...response,
    results: data,
  }
}
