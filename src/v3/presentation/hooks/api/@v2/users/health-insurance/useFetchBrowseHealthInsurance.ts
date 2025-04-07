import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseHealthInsurance,
  BrowseUserHealthInsuranceParams,
} from '@/v3/infra/services/@v2/users/health-insurances/browse-health-insurance'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseHealthInsurance = (params: BrowseUserHealthInsuranceParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseHealthInsurance(params),
    queryKey: [QueryKeyEnum.HEALTH_INSURANCE, params.userId],
  })

  return {
    ...response,
    healthInsurances: data,
  }
}
