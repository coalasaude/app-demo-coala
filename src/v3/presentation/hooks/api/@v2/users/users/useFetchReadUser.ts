import { ReadUserParams, readUser } from '@/v3/infra/services/@v2/users/users/read-user'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../@shared/useFetch'

export const useFetchReadUser = (params: ReadUserParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => {
      if (!params.userId) return Promise.resolve(undefined)
      return readUser(params)
    },
    queryKey: [QueryKeyEnum.USER, params.userId, 'v2'],
  })

  return {
    ...response,
    user: data,
  }
}
