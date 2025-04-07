import { useMemo } from 'react'

import { getAppointment } from '@/v3/infra/services/appointment'
import { Appointment } from '@/v3/domain/Appointment'
import { TApiAppointmentResponse } from '@/v3/domain/api/ApiAppointmentResponse'

import { useFetch } from './useFetch'

export const useFetchAppointment = (id?: number) => {
  const { data: appointmentData, ...rest } = useFetch({
    queryFn: () => {
      if (!id) return Promise.resolve(null)
      return getAppointment(id)
    },
    queryKey: ['appointment', id],
  })

  const data: TApiAppointmentResponse | undefined = appointmentData?.data

  const appointment = useMemo(() => (data ? new Appointment(data) : undefined), [data])

  return {
    appointmentData: {
      ...rest,
      data: appointment,
    },
  }
}
