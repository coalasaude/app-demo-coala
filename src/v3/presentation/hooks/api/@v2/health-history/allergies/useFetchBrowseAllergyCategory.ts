import { browseAllergyCategory } from '@/v3/infra/services/@v2/health-history/allergies/browse-allergy-category'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseAllergyCategory = () => {
  const { data, ...response } = useFetch({
    queryFn: () => browseAllergyCategory(),
    queryKey: [QueryKeyEnum.ALLERGY_CATEGORIES],
  })

  return {
    ...response,
    categories: data,
  }
}
