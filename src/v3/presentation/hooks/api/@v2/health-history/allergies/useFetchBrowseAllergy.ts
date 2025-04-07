import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  browseAllergy,
  BrowseAllergyParams,
} from '@/v3/infra/services/@v2/health-history/allergies/browse-allergies'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseAllergy = (params: Partial<BrowseAllergyParams>) => {
  const { data, ...response } = useFetch({
    queryFn: async () => {
      if (!params.userId) return null
      return browseAllergy({ userId: params.userId })
    },
    queryKey: [QueryKeyEnum.ALLERGY, params.userId],
  })

  return {
    ...response,
    allergies: data,
  }
}
