import { useMemo, useState } from 'react'
import { debounce } from 'lodash'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browseCategory } from '@/v3/infra/services/@v2/mental-health/learning/browse-category'

import { useFetch } from '../@shared/useFetch'

type BrowseCategoryParams = {
  name?: string
  patientId: number
}

export const useFetchBrowseCategory = () => {
  const [search, setSearch] = useState<BrowseCategoryParams>({ patientId: 0, name: '' })

  const { data, ...response } = useFetch({
    queryFn: () => browseCategory(search),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI, search],
  })

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value)
      }, 1000),
    [setSearch],
  )
  const { count, result } = data || {}

  const categoryOptions = useMemo(
    () =>
      result?.map((category) => ({
        value: category.id || 0,
        label: category.name || '',
      })),
    [result],
  )

  return {
    ...response,
    data,
    category: result,
    count,
    search,
    categoryOptions,
    setSearchCategory: debouncedSetSearch,
  }
}
