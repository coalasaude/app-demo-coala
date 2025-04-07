import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readMentalHealthBehavior,
  ReadMentalHealthBehaviorParams,
} from '@/v3/infra/services/@v2/mental-health/registers/behavior/read-behavior'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchReadMentalHealthBehavior = (params: ReadMentalHealthBehaviorParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readMentalHealthBehavior(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REGISTER_BEHAVIOR, params.userId, params],
  })

  return {
    ...response,
    behavior: data,
  }
}
