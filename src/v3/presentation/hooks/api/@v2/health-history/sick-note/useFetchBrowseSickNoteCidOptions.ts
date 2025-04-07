import { debounce } from 'lodash'
import { useMemo, useState } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browseSickNoteCidOptions } from '@/v3/infra/services/@v2/health-history/sick-note/browse-sick-note-cid-options'

import { useFetch } from '../../@shared/useFetch'



export const useFetchBrowseSickNoteCidOptions = () => {
  const [search, setSearch] = useState('')

  const { data, ...response } = useFetch({
    queryFn: () => browseSickNoteCidOptions({ search }),
    queryKey: [QueryKeyEnum.SICK_NOTE_CID_OPTIONS, search],
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
    sickNoteOptions: data,
    setSearch: debouncedSetSearch,
  }
}
