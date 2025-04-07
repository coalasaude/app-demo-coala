import { debounce } from 'lodash'
import { useMemo, useState } from 'react'

import { QueryKeyEnum } from '@/v3/presentation/enums/query-keys.enum'
import { browseAppointmentCidOptions } from '@/v3/infra/services/@v2/appointment/diagnose/browse-cid-options'

import { useFetch } from '../../@shared/useFetch'



export const useFetchBrowseAppointmentCidOptions = () => {
  const [search, setSearch] = useState('')

  const { data, ...response } = useFetch({
    queryFn: () => browseAppointmentCidOptions({ search }),
    queryKey: [QueryKeyEnum.APPOINTMENT_CID, search],
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
    cidOptions: data,
    setSearch: debouncedSetSearch,
  }
}
