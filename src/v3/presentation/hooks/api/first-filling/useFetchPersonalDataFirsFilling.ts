import { useMemo } from 'react'

import { PersonalDataSteps, UserPersonalDataFills } from '@/v3/domain/UserPersonalDataFills'
import { TApiUserFirstFillsGetResponse } from '@/v3/domain/api/ApiUserFirstFillsGetResponse'
import { getPersonalDataFirsFillingStep } from '@/v3/infra/services/first-filling'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { FirstFillingType } from '@/v3/domain/UserFirstFills'

import { useFetch } from '../../useFetch'

export const useFetchPersonalDataFirsFilling = ({ userId }: { userId?: number }) => {
  const {
    data: response,
    isLoading,
    ...rest
  } = useFetch<TApiUserFirstFillsGetResponse<PersonalDataSteps>>({
    queryFn: () => {
      if (!userId) return Promise.resolve(null)
      return getPersonalDataFirsFillingStep({ userId })
    },
    queryKey: [QueryKeyEnum.FIRST_FILLING, FirstFillingType.PERSONAL_DATA, userId],
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const data = useMemo(() => {
    return {
      results: response?.steps?.map((step) => new UserPersonalDataFills(step)),
      actualStep: response?.actualStep,
    }
  }, [response])

  return {
    data,
    isLoadingFirstFills: isLoading,
    ...rest,
  }
}
