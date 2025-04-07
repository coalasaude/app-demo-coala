import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseBodyMass,
  BrowseBodyMassParams,
} from '@/v3/infra/services/@v2/health-history/body-mass/browse-body-mass'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseBodyMass = (params: Partial<BrowseBodyMassParams>) => {
  const { data, ...response } = useFetch({
    queryFn: async () => {
      if (!params.userId) return null
      return browseBodyMass({ userId: params.userId })
    },
    queryKey: [QueryKeyEnum.BODY_MASS, params.userId],
  })

  return {
    ...response,
    bodyMass: data,
  }
}
