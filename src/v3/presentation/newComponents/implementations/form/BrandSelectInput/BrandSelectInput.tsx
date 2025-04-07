import { useMemo, useState } from 'react'
import { debounce } from 'lodash'

import {
  AutocompleteInput,
  ICAutocompleteUncontrolled,
} from '@/v3/presentation/components/AutocompleteInput'
import { BrandFilters, useFetchListBrands } from '@/v3/presentation/hooks/api/organizations'

export interface IBrandSelectInput extends Partial<ICAutocompleteUncontrolled> {
  filters?: BrandFilters
  brandId?: number | null
  setBrandId: (id?: number | null) => void
}

export const BrandSelectInput = ({
  brandId,
  setBrandId,
  label = 'Marca',
  filters = {},
  ...props
}: IBrandSelectInput) => {
  const [brandFilter, setBrandFilter] = useState<string>()
  const { data, isLoading } = useFetchListBrands({ ...filters, searchName: brandFilter })

  const onFilter = debounce((value) => {
    setBrandFilter(value)
  }, 600)

  const autoCompleteOptions = useMemo(() => {
    const allOptions = [...(data?.results ?? [])]?.map(({ id, fantasyName }) => ({
      value: id,
      label: fantasyName,
    }))

    return allOptions
  }, [data?.results])

  return (
    <AutocompleteInput
      options={autoCompleteOptions}
      label={label}
      value={autoCompleteOptions.find((option) => option.value == Number(brandId)) || null}
      isLoading={isLoading}
      onInputChange={(e, value, reason) => {
        if (reason === 'clear') {
          onFilter(undefined)
          return setBrandId(null)
        }
        onFilter(value)
      }}
      onChange={(_, option) => {
        onFilter(undefined)
        setBrandId(option?.value || null)
      }}
      {...props}
    />
  )
}
