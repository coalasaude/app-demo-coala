import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browsePeiPdiRequesters } from '@/v3/infra/services/@v2/mental-health/learning/browse-pei-pdi-requesters'

import { useFetch } from '../@shared/useFetch'

interface UseFetchBrowsePeiPdiRequestersParams {
  institutionId: number
  searchName?: string
  limit?: number
  offset?: number
}

export const useFetchBrowsePeiPdiRequesters = (params: UseFetchBrowsePeiPdiRequestersParams) => {
  const { data, ...response } = useFetch({
    queryFn: async () => {
      if (!params.institutionId) return null
      return browsePeiPdiRequesters(params)
    },
    queryKey: [QueryKeyEnum.APPOINTMENT_REQUESTER, params],
  })

  return {
    ...response,
    requesters: data,
  }
}
