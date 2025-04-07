import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { readInstitutionalPeiPdi } from '@/v3/infra/services/@v2/mental-health/learning/read-institutional-pei-pdi'

import { useFetch } from '../@shared/useFetch'

type ReadInstitutionalPeiPdiParams = {
  institutionId: number
  userId: number
}

export const useFetchReadInstitutionalPeiPdi = (params: ReadInstitutionalPeiPdiParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readInstitutionalPeiPdi(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_INSTITUTIONAL_PEI_PDI, params],
  })

  return {
    ...response,
    data,
  }
}
