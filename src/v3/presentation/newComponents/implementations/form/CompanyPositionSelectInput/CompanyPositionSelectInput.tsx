import { useMemo } from 'react'

import {
  AutocompleteInput,
  ICAutocompleteUncontrolled,
} from '@/v3/presentation/components/AutocompleteInput'
import { useFetchBrowseCompanyPosition } from '@/v3/presentation/hooks/api/@v2/users/company-positions/useFetchBrowseCompanyPositions'

export interface ICompanyPositionSelectInput extends Partial<ICAutocompleteUncontrolled> {
  companyPositionId?: number | null
  setCompanyPositionId: (id?: number | null) => void
}

export const CompanyPositionSelectInput = ({
  companyPositionId,
  setCompanyPositionId,
  label = 'Cargo',
  ...props
}: ICompanyPositionSelectInput) => {
  const { companyPositions, isPending } = useFetchBrowseCompanyPosition()

  const autoCompleteOptions = useMemo(() => {
    const allOptions = [...(companyPositions ?? [])]?.map(({ id, name }) => ({
      value: id,
      label: name,
    }))

    return allOptions
  }, [companyPositions])

  return (
    <AutocompleteInput
      options={autoCompleteOptions}
      label={label}
      value={
        autoCompleteOptions.find((option) => option.value == Number(companyPositionId)) || null
      }
      isLoading={isPending}
      onInputChange={(e, value, reason) => {
        if (reason === 'clear') {
          return setCompanyPositionId(null)
        }
      }}
      onChange={(_, option) => {
        setCompanyPositionId(option?.value || null)
      }}
      {...props}
    />
  )
}
