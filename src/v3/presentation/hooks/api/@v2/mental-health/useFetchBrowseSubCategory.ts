import { useMemo, useState } from 'react'
import { debounce } from 'lodash'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browseSubCategory } from '@/v3/infra/services/@v2/mental-health/learning/browse-sub-category'

import { useFetch } from '../@shared/useFetch'

type BrowseSubCategoryParams = {
  categoryId: number
  name?: string
  patientId: number
}

export const useFetchBrowseSubCategory = () => {
  const [search, setSearch] = useState<BrowseSubCategoryParams>({
    categoryId: 1,
    patientId: 0,
    name: '',
  })

  const setSearchSubCategory = useMemo(
    () =>
      debounce((value) => {
        setSearch(value)
      }, 50),
    [setSearch],
  )

  const { data, ...response } = useFetch({
    queryFn: () => browseSubCategory(search),
    queryKey: [QueryKeyEnum.MENTAL_HEALTH_PEI_PDI, search],
  })

  const { count, result } = data || {}

  const subCategoryOptions = useMemo(() => {
    if (!result) return []

    return result.map((subcategory) => ({
      value: subcategory.id || 0,
      label: subcategory.name || '',
    }))
  }, [result])

  const searchSubCategory = async (categoryId: number, subCategoryName: string) => {
    setSearchSubCategory({ ...search, categoryId, name: subCategoryName })

    response.refetch()

    return result?.find(({ name }) => name === subCategoryName)?.id || 1
  }

  return {
    ...response,
    data,
    result,
    count,
    search,
    subCategoryOptions,
    setSearchSubCategory,
    searchSubCategory,
    setSearch,
  }
}
