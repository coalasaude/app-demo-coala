import { useEffect, useState } from 'react'

import FilterInput from '@/components/Forms/uncontrolled/FilterInput'
import { CFilterDrawer } from '@/v3/presentation/newComponents/layout/CFilterDrawer'

type HealthUnitInstitutionListFilterProps = {
  isOpen: boolean
  onClose: () => void
  filters: Record<string, any>
  setFilters: (filters: Record<string, any>) => void
}

export const HealthUnitInstitutionListFilter = ({
  isOpen,
  onClose,
  filters,
  setFilters,
}: HealthUnitInstitutionListFilterProps) => {
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>('')

  const handleClose = () => {
    setFilters({ neighborhood: neighborhoodFilter })
    onClose()
  }

  useEffect(() => {
    if (neighborhoodFilter !== filters.city) setNeighborhoodFilter(filters.neighborhood)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.neighborhood])

  const onClearFilter = () => {
    setNeighborhoodFilter('')
  }

  return (
    <CFilterDrawer
      open={isOpen}
      onClose={handleClose}
      onApply={handleClose}
      onClear={onClearFilter}
    >
      <FilterInput
        name='state'
        label='Estado'
        value={neighborhoodFilter}
        onClearAddon={() => setNeighborhoodFilter('')}
        onChange={(e) => setNeighborhoodFilter(e.target.value)}
        placeholder='Bairro'
      />
    </CFilterDrawer>
  )
}
