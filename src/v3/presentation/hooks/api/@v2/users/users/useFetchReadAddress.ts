import { ReadUserParams } from '@/v3/infra/services/@v2/users/users/read-user'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { readAddress } from '@/v3/infra/services/@v2/users/users/read-address'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadAddress = (params: ReadUserParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => readAddress(params),
    queryKey: [QueryKeyEnum.USER, QueryKeyEnum.ADDRESS, params.userId],
  })

  return {
    ...response,
    isPending: response.isPending && !response.failureCount,
    isLoading: response.isLoading && !response.failureCount,
    address: data,
  }
}
