import { getAppointmentCount } from '@/v3/infra/services/appointment'

import { useFetch } from '../../useFetch'

export const useFetchAppointmentCount = (institutionId?: number) => {
  const { data, ...rest } = useFetch({
    queryFn: () => {
      if (!institutionId) return Promise.resolve(null)
      return getAppointmentCount(institutionId)
    },
    queryKey: ['appointment-count', institutionId],
  })

  return {
    data,
    ...rest,
  }
}
