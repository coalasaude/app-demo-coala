import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  IndicationApiFilter,
  createIndication,
  listIndication,
} from '@/v3/infra/services/indication'
import { Indication } from '@/v3/domain/Indication'
import { TApiIndicationResponse } from '@/v3/domain/api/ApiIndicationResponse'

import { useFetch } from './useFetch'

export const useFetchIndicationList = () => {
  const [filter, setFilter] = React.useState<IndicationApiFilter>({})
  const { invalidateQueries } = useQueryClient()
  const { data: indicationData, ...rest } = useFetch({
    queryKey: ['indications', filter],
    queryFn: () => listIndication(filter),
  })
  const { mutate } = useMutation({
    mutationFn: createIndication,
    onSuccess: () => {
      invalidateQueries({ queryKey: ['indications'] })
    },
  })

  const data: Indication[] = React.useMemo(
    () =>
      indicationData?.data?.results.map(
        (indication: TApiIndicationResponse) => new Indication(indication)
      ) || [],
    [indicationData]
  )

  const addIndication = React.useCallback(
    (indication: {
      fantasyName: string
      managerName: string
      managerEmail: string
      managerPhone: string
      state: string
      city: string
      numberStudents: number
      monthlyPayment: number
    }) =>
      mutate({
        fantasy_name: indication?.fantasyName,
        manager_name: indication?.managerName,
        manager_email: indication?.managerEmail,
        manager_phone: indication?.managerPhone,
        state: indication?.state,
        city: indication?.city,
        number_students: indication?.numberStudents,
        monthly_payment: indication?.monthlyPayment,
      } as any),
    [mutate]
  )

  return {
    data,
    addIndication,
    filter,
    setFilter,
    ...rest,
  }
}
