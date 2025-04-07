import { listPermissions } from '@/v3/infra/services/permissions'

import { useFetch } from './useFetch'

export const useFetchPermissions = () => {
  const { data } = useFetch({
    queryFn: listPermissions,
    queryKey: ['permissions'],
  })

  return data?.data
}
