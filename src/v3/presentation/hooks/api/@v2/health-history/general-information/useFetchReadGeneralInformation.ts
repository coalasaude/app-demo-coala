import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import {
  readGeneralInformation,
  ReadGeneralInformationParams,
} from '@/v3/infra/services/@v2/health-history/general-information/read-general-information'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadGeneralInformation = (params: ReadGeneralInformationParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readGeneralInformation(params),
    queryKey: [QueryKeyEnum.GENERAL_INFORMATION, params.userId],
  })

  return {
    ...response,
    generalInformation: data,
  }
}
