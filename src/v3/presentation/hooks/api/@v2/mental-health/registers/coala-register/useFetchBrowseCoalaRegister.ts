import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseMentalHealthCoalaRegister,
  BrowseMentalHealthCoalaRegisterParams,
} from '@/v3/infra/services/@v2/mental-health/registers/coala-register/browse-coala-register'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchBrowseMentalHealthCoalaRegister = (
  params: BrowseMentalHealthCoalaRegisterParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseMentalHealthCoalaRegister(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REGISTER_COALA_REGISTER, params.userId],
  })

  return {
    ...response,
    results: data,
  }
}
