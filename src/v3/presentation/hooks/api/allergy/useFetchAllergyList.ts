import React, { useEffect, useMemo, useState } from 'react'

import { limit } from '@/constants/api'
import { UserAllergy } from '@/v3/domain/UserAllergy'
import { TApiAllergylistResponse } from '@/v3/domain/api/ApiAllergyListResponse'
import { getAllergyList } from '@/v3/infra/services/allergy'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'

import { useFetch } from '../../useFetch'

const refetchInterval = 30000

export const useFetchAllergyList = ({ userId }: { userId?: number }) => {
  const [filter, setFilter] = React.useState<Record<string, string>>({})
  const [offset, setOffset] = useState(0)
  const [orderByField, setOrderByField] = useState('')
  const [page, setPage] = useState(1)

  const {
    data: allergyData,
    refetch,
    ...rest
  } = useFetch<TApiAllergylistResponse>({
    queryKey: [QueryKeyEnum.ALLERGY, userId, filter, offset, orderByField],
    queryFn: () => {
      if (!userId) return Promise.resolve(null)
      return getAllergyList({
        orderByField,
        filters: filter,
        limit,
        offset,
        userId,
      })
    },
    refetchInterval: offset === 0 ? refetchInterval : Infinity,
  })
  const totalPages = useMemo(() => Math.ceil((allergyData?.count || 0) / limit), [allergyData])
  const count = useMemo(() => Number(allergyData?.count || 0), [allergyData])

  const handleRequestSort = (property: string) => {
    const fieldName = /^(\-(\w*))$/g.test(orderByField) ? property : `-${property}`
    setOrderByField(fieldName)
  }

  const direction: 'desc' | 'asc' = /^(\-(\w*))$/g.test(orderByField) ? 'desc' : 'asc'

  const data = React.useMemo(
    () => allergyData?.results?.map((allergy) => new UserAllergy(allergy)) || [],
    [allergyData]
  )

  useEffect(() => {
    setOffset(() => limit * (page - 1))
  }, [page])

  return {
    data,
    filter,
    count,
    totalPages,
    page,
    setPage,
    handleRequestSort,
    direction,
    setFilter,
    refetch,
    ...rest,
  }
}
