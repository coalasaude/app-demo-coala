import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readHealthInsurance,
  ReadUserHealthInsuranceParams,
} from '@/v3/infra/services/@v2/users/health-insurances/read-health-insurance'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadHealthInsurance = (params: ReadUserHealthInsuranceParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readHealthInsurance(params),
    queryKey: [QueryKeyEnum.HEALTH_INSURANCE, params.userId, params.healthInsuranceId],
  })

  return {
    ...response,
    healthInsurance: data,
  }
}
