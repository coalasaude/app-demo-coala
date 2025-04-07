import { getCertificate } from '@/v3/infra/services/course'

import { useFetch } from './api/@v2/@shared/useFetch'

export const useFetchCertificate = (certificateId: string) => {
  const { data, ...rest } = useFetch({
    queryFn: () => {
      if (!certificateId) {
        return Promise.resolve(undefined)
      }

      return getCertificate(certificateId)
    },
    queryKey: ['certificate', certificateId],
  })

  return {
    ...rest,
    data,
  }
}
