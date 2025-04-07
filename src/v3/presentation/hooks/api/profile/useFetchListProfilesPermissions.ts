import {
  TApiListProfilePermission,
  getProfilesPermissions,
} from '@/v3/infra/services/profiles/profiles'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { PermissionCategory } from '@/v3/domain/Permission'

import { useFetch } from '../../useFetch'

export const useFetchListProfilesPermissions = () => {
  const response = useFetch<TApiListProfilePermission[]>({
    queryFn: getProfilesPermissions,
    queryKey: [QueryKeyEnum.PROFILES_PERMISSIONS],
  })

  const data = response.data?.map((item) => new PermissionCategory(item))

  return {
    ...response,
    data,
  }
}
