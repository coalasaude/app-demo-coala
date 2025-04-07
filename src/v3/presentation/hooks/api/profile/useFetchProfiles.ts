import { TApiProfileResponse, getProfiles } from '@/v3/infra/services/profiles/profiles'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { Profile } from '@/v3/domain/Profile'
import { InstitutionalType } from '@/v3/domain/InstitutionalType'

import { useFetch } from '../../useFetch'

export const useFetchProfiles = () => {
  const response = useFetch<TApiProfileResponse>({
    queryFn: getProfiles,
    queryKey: [QueryKeyEnum.PROFILES],
  })

  const data = response.data?.results?.map(
    (item) =>
      new Profile({
        ...item,
        ...(item.InstitutionalType && {
          institutionalType: new InstitutionalType(item.InstitutionalType),
        }),
      })
  )

  return {
    ...response,
    data,
  }
}
