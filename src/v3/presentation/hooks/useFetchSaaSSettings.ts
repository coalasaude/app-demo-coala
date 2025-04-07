import React from 'react'

import { SaaSSettings } from '@/v3/domain/SaaSSettings'
import { getSettings } from '@/v3/infra/services/saasSettings'

import { useFetch } from './useFetch'

export const useFetchSaaSSettings = () => {
  const { data: response, ...rest } = useFetch({
    queryKey: ['saas-settings'],
    queryFn: () => getSettings(),
  })

  const data = React.useMemo(
    () => response && new SaaSSettings(response),
    [response],
  ) as SaaSSettings

  return { data, ...rest }
}
