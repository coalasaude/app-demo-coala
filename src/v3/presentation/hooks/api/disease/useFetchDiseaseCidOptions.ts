import { useMemo, useState } from 'react'
import { debounce } from 'lodash'

import { getAllDiseaseCIDOptions } from '@/v3/infra/services/disease'
import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { TApiDiseaseCIDOptionsResponse } from '@/v3/domain/api/ApiDiseaseResponse'

import { useFetch } from '../../useFetch'

interface IUseFetchDiseaseCidOptions {
  onlyPopularName?: boolean
}

export const useFetchDiseaseCidOptions = (oprions?: IUseFetchDiseaseCidOptions) => {
  const [search, setSearch] = useState('')
  const {
    data: diseaseCidOptions,
    isLoading,
    ...rest
  } = useFetch<TApiDiseaseCIDOptionsResponse>({
    queryKey: [QueryKeyEnum.DISEASE_CID_OPTIONS, search],
    queryFn: () => getAllDiseaseCIDOptions({ search, limit: 20, ...oprions }),
  })

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value)
      }, 1000),
    [setSearch],
  )

  return {
    diseaseCidOptions,
    isLoading,
    setSearchDiseases: debouncedSetSearch,
    ...rest,
  }
}
