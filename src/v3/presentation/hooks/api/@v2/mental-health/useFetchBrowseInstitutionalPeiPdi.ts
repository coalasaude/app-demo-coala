import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browseInstitutionalPlans } from '@/v3/infra/services/@v2/mental-health/learning/browse-institutional-pei-pdi'

import { useFetch } from '../@shared/useFetch'

type BrowseInstitutionalPlansParams = {
  userId: number
  institutionId: number
  limit: number
  offset: number
  name?: string
}

export const useFetchBrowseInstitutionalPeiPdi = (params: BrowseInstitutionalPlansParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseInstitutionalPlans(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_INSTITUTIONAL_PEI_PDI, params],
  })

  return {
    ...response,
    data: data?.data || [],
    pagination: data?.pagination,
  }
}
