import { useMemo, useState } from 'react'
import { debounce } from 'lodash'

import {
  AutocompleteInput,
  ICAutocompleteUncontrolled,
} from '@/v3/presentation/components/AutocompleteInput'
import { useFetchBrowseMentalHealthSubject } from '@/v3/presentation/hooks/api/@v2/mental-health/registers/area-of-​​interest/useFetchBrowseMentalHealthSubject'

export interface ISubjectSelectInput extends Partial<ICAutocompleteUncontrolled> {
  subjectIds?: number[]
  setSubjectIds: (id?: number[]) => void
}

export const SubjectSelectInput = ({
  subjectIds,
  setSubjectIds,
  ...props
}: ISubjectSelectInput) => {
  const [search, setSearch] = useState('')
  const { results, isPending } = useFetchBrowseMentalHealthSubject({
    search,
    limit: 30,
  })

  const doSearchFilter = debounce((value) => {
    setSearch(value)
  }, 600)

  const autoCompleteOptions = useMemo(() => {
    const allOptions = [...(results?.data ?? [])]?.map(({ id, name }) => ({
      value: id,
      label: name,
    }))

    return allOptions
  }, [results])

  return (
    <AutocompleteInput
      options={autoCompleteOptions}
      multiple
      freeSolo
      disableCloseOnSelect
      filterOptions={(options) => options}
      label={''}
      placeholder='Selecione as disciplinas'
      value={
        autoCompleteOptions.filter((option) => subjectIds?.includes(Number(option.value))) || []
      }
      isLoading={isPending}
      onInputChange={(e, value, reason) => {
        if (reason === 'clear') {
          doSearchFilter(undefined)
          return setSubjectIds([])
        }
        doSearchFilter(value)
      }}
      onChange={(_, option) => {
        doSearchFilter(undefined)
        if (Array.isArray(option)) {
          const values = option?.map((option) => option.value)
          setSubjectIds(values || [])
        }
      }}
      {...props}
    />
  )
}
