import React, { useEffect, useMemo, useState } from 'react'

import { AppointmentApiFilter, listAppointment } from '@/v3/infra/services/appointment'
import { TApiAppointmentResponse } from '@/v3/domain/api/ApiAppointmentResponse'
import { Appointment } from '@/v3/domain/Appointment'
import { limit as limitDefault } from '@/constants/api'

import { QueryKeyEnum } from '../enums/query-keys.enum'

import { useFetch } from './useFetch'

const refetchInterval = 30000

export const useFetchAppointmentList = ({ limit, userId }: { limit?: number; userId?: number }) => {
  const [filter, setFilter] = React.useState<AppointmentApiFilter>({ user_id: userId })
  const [offset, setOffset] = useState(0)
  const [orderByField, setOrderByField] = useState('')
  const [page, setPage] = useState(1)

  const {
    data: appointmentData,
    refetch,
    ...rest
  } = useFetch({
    queryKey: [QueryKeyEnum.APPOINTMENT, { filter, offset, orderByField, userId }],
    queryFn: () =>
      listAppointment({
        orderByField,
        filters: filter,
        limit: limit || limitDefault,
        offset,
        userId,
      }),
    refetchInterval: offset === 0 ? refetchInterval : Infinity,
  })
  const totalPages = useMemo(
    () => Math.ceil((appointmentData?.appointments?.count || 0) / (limit || limitDefault)),
    [appointmentData?.appointments?.count, limit],
  )
  const count = useMemo(() => Number(appointmentData?.appointments?.count || 0), [appointmentData])

  const handleRequestSort = (property: string) => {
    const fieldName = /^(\-(\w*))$/g.test(orderByField) ? property : `-${property}`
    setOrderByField(fieldName)
  }

  const direction: 'desc' | 'asc' = /^(\-(\w*))$/g.test(orderByField) ? 'desc' : 'asc'

  const data: Appointment[] = React.useMemo(
    () =>
      appointmentData?.appointments?.results?.map(
        (appointment: TApiAppointmentResponse) => new Appointment(appointment),
      ) || [],
    [appointmentData],
  )

  useEffect(() => {
    setOffset(() => (limit || limitDefault) * (page - 1))
  }, [limit, page])

  useEffect(() => {
    setPage(1)
  }, [filter])

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
    sentAt: appointmentData?.sentAt,
    ...rest,
  }
}
