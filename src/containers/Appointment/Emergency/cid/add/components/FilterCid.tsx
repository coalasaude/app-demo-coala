import { useCallback, useEffect, useMemo, useState } from 'react'
import { throttle } from 'lodash'
import { useRouter } from 'next/router'

import { limit } from '@/constants/api'
import { CAutoComplete } from '@/components/Forms'
import { useLazyFetch } from '@/hooks/useFetch'
import { Cid } from '@/types/cid'

export const FilterCid = ({ error }: any) => {
  const [apiRequest, { data: cids, loading }] = useLazyFetch<Cid[]>()
  const [cidFilter, setCidFilter] = useState<string>()
  const router = useRouter()

  const getCids = useCallback(
    async (limit?: number, offset?: number, code_description?: string) => {
      await apiRequest({
        path: `appointments/${router?.query?.id}/cid/code`,
        method: 'GET',
        queryParams: {
          code_description,
          limit,
          offset: 0,
        },
      })
    },
    [apiRequest, router?.query?.id],
  )

  useEffect(() => {
    if (cidFilter) {
      getCids(limit, 0, cidFilter)
    }
  }, [cidFilter, getCids])

  const doCidFilter = useMemo(() => throttle((value) => setCidFilter(value), 1500), [setCidFilter])

  return (
    <CAutoComplete
      label='CID'
      placeholder='Digite CID para buscar'
      name='cid_id'
      options={
        cids?.map(({ id, code, code_description }) => ({
          label: `${code} - ${code_description}`,
          value: id,
        })) || []
      }
      onInputChange={(e, value, reason) => {
        if (reason === 'input') {
          doCidFilter(value)
        }
      }}
      isLoading={loading}
      error={error?.data?.cid_id}
    />
  )
}

export default FilterCid
