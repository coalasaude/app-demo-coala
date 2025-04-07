import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getCIDs } from '@/v3/infra/services/appointment/cid/cid'
import { Cid } from '@/types/cid'

import { useFetch } from '../../@v2/@shared/useFetch'

type UseFetchCIDsParams = {
  appointmentId: number
  limit?: number
  offset?: number
  codeDescription?: string
}

export function useFetchCIDs(params: UseFetchCIDsParams) {
  const { data, ...response } = useFetch({
    queryFn: () => getCIDs(params),
    queryKey: [QueryKeyEnum.DISEASE_CID_OPTIONS, ...Object.values(params)],
  })

  return {
    ...response,
    cids: data as Cid[],
  }
}
