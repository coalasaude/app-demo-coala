import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readMentalHealthDifficulties,
  ReadMentalHealthDifficultiesParams,
} from '@/v3/infra/services/@v2/mental-health/registers/difficulties/read-difficulties'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchReadMentalHealthDifficulties = (
  params: ReadMentalHealthDifficultiesParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => readMentalHealthDifficulties(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REGISTER_DIFFICULTIES, params.userId, params],
  })

  return {
    ...response,
    difficulties: data,
  }
}
