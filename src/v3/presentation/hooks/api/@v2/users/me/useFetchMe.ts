import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { useAuth } from '@/v3/presentation/hooks/useAuth'
import { getMe } from '@/v3/infra/services/@v2/users/me/me'

import { useFetch } from '../../@shared/useFetch'

export const useFetchMe = () => {
  const { auth } = useAuth()

  const { data, ...response } = useFetch({
    queryFn: () => getMe(),
    queryKey: [QueryKeyEnum.USER, auth.userId, 'v2'],
  })

  return {
    ...response,
    user: data,
  }
}
