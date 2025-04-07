import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseMentalHealthSubject,
  BrowseMentalHealthSubjectParams,
} from '@/v3/infra/services/@v2/mental-health/registers/subjects/browse-subjects'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchBrowseMentalHealthSubject = (params: BrowseMentalHealthSubjectParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseMentalHealthSubject(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REGISTER_SUBJECTS, params],
  })

  return {
    ...response,
    results: data,
  }
}
