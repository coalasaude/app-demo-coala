import { debounce } from 'lodash'
import { useMemo, useState } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browseDiseaseCidOptions } from '@/v3/infra/services/@v2/health-history/diseases/browse-disease-cid-options'

import { useFetch } from '../../@shared/useFetch'

export const useFetchBrowseDiseaseCidOptions = () => {
  const [search, setSearch] = useState('')

  const { data, ...response } = useFetch({
    queryFn: () => browseDiseaseCidOptions({ search }),
    queryKey: [QueryKeyEnum.DISEASE_CID_OPTIONS, search],
  })

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value)
      }, 1000),
    [setSearch],
  )

  return {
    ...response,
    diseaseOptions: data,
    setSearch: debouncedSetSearch,
  }
}
