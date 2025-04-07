import React from 'react'

import { getInstitution } from '@/v3/infra/services/institution'
import { Institution } from '@/v3/domain/Institution'

import { useFetch } from './useFetch'

export const useFetchInstitution = (id?: number) => {
  const { data, ...rest } = useFetch({
    queryFn: () => {
      if (id) {
        return getInstitution(id)
      }

      return Promise.resolve(null)
    },
    queryKey: ['institution', id],
  })

  const institutionData = React.useMemo(() => {
    if (data?.data) {
      return new Institution(data.data)
    } else {
      return undefined
    }
  }, [data])

  return {
    ...rest,
    data: institutionData,
  }
}
