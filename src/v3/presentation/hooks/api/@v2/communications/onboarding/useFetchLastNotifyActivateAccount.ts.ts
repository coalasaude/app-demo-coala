import { lastNotifyAccountActivate } from '@/v3/infra/services/@v2/communications/onboarding/last-notify-activate-accounts'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../@shared/useFetch'

export const useFetchLastNotifyActivateAccount = (params: { institutionId: number }) => {
  const fetch = useFetch({
    queryFn: async () => lastNotifyAccountActivate({ institutionId: params.institutionId }),
    queryKey: [QueryKeyEnum.NOTIFICATIONS_COUNT, { params }],
    refetchOnMount: true,
  })

  return { ...fetch, data: fetch.data }
}
