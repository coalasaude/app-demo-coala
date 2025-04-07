import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseMentalHealthAreaOfInterest,
  BrowseMentalHealthAreaOfInterestParams,
} from '@/v3/infra/services/@v2/mental-health/registers/area-of-​​interest/browse-area-of-​​interest'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchBrowseMentalHealthAreaOfInterest = (
  params: BrowseMentalHealthAreaOfInterestParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseMentalHealthAreaOfInterest(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REGISTER_AREA_OF_INTEREST, params.userId],
  })

  return {
    ...response,
    results: data,
  }
}
