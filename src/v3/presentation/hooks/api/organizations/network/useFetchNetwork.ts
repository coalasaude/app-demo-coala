import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { TApiNetwork } from '@/v3/domain/api/organizations/ApiOrganizationResponse'
import { getNetwork } from '@/v3/infra/services/organizations/network'
import { Network } from '@/v3/domain/organizations/Organization'

import { useFetch } from '../../../useFetch'

export const useFetchNetwork = (
  networkId?: number,
  options?: { selectUserProfileCount?: boolean }
) => {
  const { data: response, ...rest } = useFetch<TApiNetwork>({
    queryFn: () => {
      if (!networkId) return Promise.resolve(null)

      return getNetwork(networkId, options)
    },
    queryKey: [QueryKeyEnum.COST_CENTER_NETWORK, networkId, options],
  })

  const data = response ? new Network(response) : null

  return {
    data,
    ...rest,
  }
}
