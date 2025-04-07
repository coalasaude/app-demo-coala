import { useMemo, useState } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { getInstitutionHospitals } from '@/v3/infra/services/organizations/institution'
import { IListResponse } from '@/types/request'
import { HospitalPreference } from '@/types/healthInsurance'

import { useFetch } from '../../../useFetch'

type UseFetchListHospitals = {
  institutionId?: number
  limit?: number
  offset?: number
}

export const useFetchListHospitals = (params: UseFetchListHospitals) => {
  const [offset, setOffset] = useState<number>(params.offset || 0)
  const [limit, setLimit] = useState<number>(params.limit || 10)
  const { institutionId } = params

  const { data: response, ...rest } = useFetch<IListResponse<HospitalPreference>>({
    queryFn: () => {
      if (!institutionId) return Promise.resolve(null)

      return getInstitutionHospitals(institutionId, limit, offset)
    },
    queryKey: [QueryKeyEnum.COST_CENTER_INSTITUTION],
  })

  const data = useMemo(() => {
    if (!response) return null

    return response
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, limit, offset])

  return {
    data,
    setOffset,
    setLimit,
    ...rest,
  }
}
