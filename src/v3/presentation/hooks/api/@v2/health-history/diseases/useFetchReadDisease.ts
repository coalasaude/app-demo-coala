import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readDisease,
  ReadDiseaseParams,
} from '@/v3/infra/services/@v2/health-history/diseases/read-disease'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadDisease = (params: ReadDiseaseParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readDisease(params),
    queryKey: [QueryKeyEnum.DISEASE, params.userId, params.diseaseId],
  })

  return {
    ...response,
    disease: data,
  }
}
