import { BrowseUserParams, browseUser } from '@/v3/infra/services/@v2/users/users/browse-user'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseUser = (params: BrowseUserParams) => {
  const { data, ...response } = useFetch({
    queryFn: () => browseUser(params),
    queryKey: [QueryKeyEnum.USER, params],
    refetchOnMount: true,
  })

  return {
    ...response,
    users: data,
  }
}
