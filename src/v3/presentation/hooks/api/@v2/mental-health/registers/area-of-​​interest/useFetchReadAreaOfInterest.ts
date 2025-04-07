import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readMentalHealthAreaOfInterest,
  ReadMentalHealthAreaOfInterestParams,
} from '@/v3/infra/services/@v2/mental-health/registers/area-of-​​interest/read-area-of-​​interest'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchReadMentalHealthAreaOfInterest = (
  params: ReadMentalHealthAreaOfInterestParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => readMentalHealthAreaOfInterest(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REGISTER_AREA_OF_INTEREST, params.userId, params],
  })

  return {
    ...response,
    areaOfInterest: data,
  }
}
