import {
  browseMentalHealthRegisterCategories,
  BrowseMentalHealthRegisterCategoriesParams,
} from '@/v3/infra/services/@v2/mental-health/registers/categories/browse-categories'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../../@shared/useFetch'

export const useFetchBrowseMentalHealthRegisterCategories = (
  params: BrowseMentalHealthRegisterCategoriesParams,
) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseMentalHealthRegisterCategories(params),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_REGISTER_CATEGORIES, params.userId, params],
  })

  return {
    ...response,
    results: data,
  }
}
