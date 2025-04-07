import { useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { getCities, getStates } from '@brazilian-utils/brazilian-utils'
import { State } from '@brazilian-utils/brazilian-utils/dist/common/states'

import { CFilterDrawer } from '@/v3/presentation/newComponents/layout/CFilterDrawer'
import { AutocompleteInput } from '@/v3/presentation/components/AutocompleteInput'

type HealthUnitListFilterProps = {
  isOpen: boolean
  onClose: () => void
  filters: Record<string, any>
  setFilters: (filters: Record<string, any>) => void
}

export const HealthUnitListFilter = ({
  setFilters,
  isOpen,
  onClose,
  filters,
}: HealthUnitListFilterProps) => {
  const [cityFilter, setCityFilter] = useState<string | null>(filters.city)
  const [stateFilter, setStateFilter] = useState<State | null>(filters.state)
  const stateOptions = useMemo(
    () => getStates().map(({ code, name }) => ({ value: code, label: name })),
    [],
  )

  const cityOptions = useMemo(
    () => getCities(stateFilter || undefined).map((city) => ({ value: city, label: city })),
    [stateFilter],
  )

  const handleClose = () => {
    setFilters({
      city: cityFilter ? cityFilter : null,
      state: stateFilter ? stateFilter : null,
    })
    onClose()
  }

  useEffect(() => {
    function updateFilter<T>(
      filter: string | null,
      value: T | null,
      setFilter: (value: T | null) => void,
    ): void {
      if (!value) {
        setFilter(null)
      } else if (filter !== value) {
        setFilter(value)
      }
    }
    updateFilter<string | null>(cityFilter, filters.city, setCityFilter)
    updateFilter<State | null>(stateFilter, filters.state, setStateFilter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.city, filters.state])

  const onClearFilter = () => {
    setCityFilter(null)
    setStateFilter(null)
  }

  const stateValue = stateOptions.filter((option) => option.value === stateFilter)[0]
  const cityValue = cityOptions.filter((option) => option.value === cityFilter)[0]

  return (
    <CFilterDrawer
      open={isOpen}
      onClose={handleClose}
      onApply={handleClose}
      onClear={onClearFilter}
    >
      <Box display='flex' flexDirection='column' gap={2}>
        <AutocompleteInput
          label='Estado'
          value={stateValue || null}
          placeholder='Estado'
          onChange={(e: any, value) => {
            setStateFilter(value?.value)
          }}
          fullWidth
          options={stateOptions}
        />
        <AutocompleteInput
          label='Cidade'
          value={cityValue || null}
          placeholder='Cidade'
          onChange={(e: any, value) => {
            setCityFilter(value?.value)
          }}
          fullWidth
          options={cityOptions}
        />
      </Box>
    </CFilterDrawer>
  )
}
