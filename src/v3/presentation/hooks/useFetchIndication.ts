import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Indication } from '@/v3/domain/Indication'
import { getIndication, updateIndication } from '@/v3/infra/services/indication'

import { useFetch } from './useFetch'

export const useFetchIndication = (id: string) => {
  const { invalidateQueries } = useQueryClient()
  const { data: indicationData, ...rest } = useFetch({
    queryKey: ['indications', id],
    queryFn: () => getIndication(id),
  })
  const { mutate } = useMutation({
    mutationFn: updateIndication,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['indications', id] })
    },
  })

  const data: Indication | undefined = React.useMemo(() => {
    return indicationData?.data ? new Indication(indicationData.data) : undefined
  }, [indicationData])

  return {
    data,
    updateIndication: mutate,
    ...rest,
  }
}
