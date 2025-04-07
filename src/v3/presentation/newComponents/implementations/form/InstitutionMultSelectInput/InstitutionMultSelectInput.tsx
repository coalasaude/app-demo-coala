import { debounce } from 'lodash'
import { useMemo, useState } from 'react'

import {
  AutocompleteInput,
  ICAutocompleteUncontrolled,
} from '@/v3/presentation/components/AutocompleteInput'
import { useFetchInstitutions } from '@/v3/presentation/hooks/api/institution/useFetchInstitutions'

export interface IInstitutionMultSelectInput extends Partial<ICAutocompleteUncontrolled> {
  brandId?: number
  institutionsIds?: number[]
  setInstitutionsIds: (id?: number[]) => void
}

export const InstitutionMultSelectInput = ({
  institutionsIds,
  setInstitutionsIds,
  label = 'Instituições',
  brandId,
  ...props
}: IInstitutionMultSelectInput) => {
  const [institutionFilter, setInstitutionFilter] = useState<string>()

  const { institutions, isLoading } = useFetchInstitutions({
    searchName: institutionFilter,
    includeIds: institutionsIds ? institutionsIds : null,
    limit: 10,
    brandId,
  })

  const doInstitutionFilter = debounce((value) => {
    setInstitutionFilter(value)
  }, 600)

  const autoCompleteOptions = useMemo(() => {
    const allOptions = [...(institutions || [])]?.map(({ id, fantasyName }) => ({
      value: id,
      label: fantasyName,
    }))

    return allOptions
  }, [institutions])

  return (
    <AutocompleteInput
      options={autoCompleteOptions}
      multiple
      label={label}
      value={autoCompleteOptions.filter((option) =>
        institutionsIds?.includes(Number(option.value)),
      )}
      isLoading={isLoading}
      onInputChange={(e, value, reason) => {
        if (reason === 'clear') {
          doInstitutionFilter(undefined)
          return setInstitutionsIds([])
        }
        doInstitutionFilter(value)
      }}
      onChange={(_, option) => {
        doInstitutionFilter(undefined)
        if (Array.isArray(option)) {
          const values = option?.map((option) => option.value)
          setInstitutionsIds(values || [])
        }
      }}
      {...props}
    />
  )
}
