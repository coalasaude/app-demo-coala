import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readAllergy,
  ReadAllergyParams,
} from '@/v3/infra/services/@v2/health-history/allergies/read-allergy'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadAllergy = (params: ReadAllergyParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readAllergy(params),
    queryKey: [QueryKeyEnum.ALLERGY, params.userId, params.allergyId],
  })

  return {
    ...response,
    allergy: data,
  }
}
