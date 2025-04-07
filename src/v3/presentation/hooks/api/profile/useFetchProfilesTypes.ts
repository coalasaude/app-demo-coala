import { getProfilesTypes } from '@/v3/infra/services/profiles/profiles'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { InstitutionalType } from '@/v3/domain/InstitutionalType'

import { useFetch } from '../../useFetch'

export const useFetchProfilesTypes = () => {
  const response = useFetch<InstitutionalType[]>({
    queryFn: getProfilesTypes,
    queryKey: [QueryKeyEnum.PROFILES_TYPES],
  })

  const data = response.data?.map(
    (item) =>
      new InstitutionalType({
        id: item.id,
        name: item.name,
      })
  )

  return {
    ...response,
    data,
  }
}
