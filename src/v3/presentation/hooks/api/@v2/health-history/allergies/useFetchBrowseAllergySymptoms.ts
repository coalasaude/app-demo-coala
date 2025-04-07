import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browseAllergySymptoms } from '@/v3/infra/services/@v2/health-history/allergies/browse-allergy-symptoms'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseAllergySymptom = () => {
  const { data, ...response } = useFetch({
    queryFn: () => browseAllergySymptoms(),
    queryKey: [QueryKeyEnum.ALLERGY_SYMPTOMS],
  })

  return {
    ...response,
    symptoms: data,
  }
}
