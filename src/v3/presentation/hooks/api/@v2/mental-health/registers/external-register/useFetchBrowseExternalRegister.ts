import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseMentalHealthExternalRegister,
  BrowseMentalHealthExternalRegisterParams,
} from '@/v3/infra/services/@v2/mental-health/registers/external-register/browse-external-register'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchBrowseMentalHealthExternalRegister = (
  params: BrowseMentalHealthExternalRegisterParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseMentalHealthExternalRegister(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REGISTER_EXTERNAL_REGISTER, params.userId],
  })

  return {
    ...response,
    results: data,
  }
}
