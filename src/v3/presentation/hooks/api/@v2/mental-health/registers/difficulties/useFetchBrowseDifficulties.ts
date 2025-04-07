import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseMentalHealthDifficulties,
  BrowseMentalHealthDifficultiesParams,
} from '@/v3/infra/services/@v2/mental-health/registers/difficulties/browse-difficulties'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchBrowseMentalHealthDifficulties = (
  params: BrowseMentalHealthDifficultiesParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseMentalHealthDifficulties(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REGISTER_DIFFICULTIES, params.userId],
  })

  return {
    ...response,
    results: data,
  }
}
