import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { ListUserOnboardingParams, listUserOnboarding } from '@/v3/infra/services/@v2/import'

import { useFetch } from '../@shared/useFetch'

export const useFetchBrowseUserOnboarding = (params: ListUserOnboardingParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => listUserOnboarding(params),
    queryKey: [QueryKeyEnum.IMPORT, ...Object.values(params)],
  })

  return {
    ...response,
    response: data,
  }
}
