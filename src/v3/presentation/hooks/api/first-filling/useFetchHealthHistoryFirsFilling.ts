import { useMemo } from 'react'

import { UserHealthHistoricFills } from '@/v3/domain/UserHealthHistoricFills'
import { TApiUserFirstFillsGetResponse } from '@/v3/domain/api/ApiUserFirstFillsGetResponse'
import { getHealthHistoryFirsFillingStep } from '@/v3/infra/services/first-filling'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { FirstFillingType } from '@/v3/domain/UserFirstFills'

import { useFetch } from '../../useFetch'

export const useFetchHealthHistoryFirsFilling = ({ userId }: { userId?: number }) => {
  const {
    data: response,
    isLoading,
    ...rest
  } = useFetch<TApiUserFirstFillsGetResponse>({
    queryFn: () => {
      if (!userId) return Promise.resolve(null)
      return getHealthHistoryFirsFillingStep({ userId })
    },
    queryKey: [QueryKeyEnum.FIRST_FILLING, FirstFillingType.HEALTH_HISTORY, userId],
    refetchInterval: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })

  const data = useMemo(() => {
    return {
      results: response?.steps?.map((step) => new UserHealthHistoricFills(step)),
      actualStep: response?.actualStep,
    }
  }, [response])

  return {
    data,
    isLoadingFirstFills: isLoading,
    ...rest,
  }
}
