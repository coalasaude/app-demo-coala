
import { CAutoComplete } from '@/components/Forms'
import { useFetchBrowseAppointmentCidOptions } from '@/v3/presentation/hooks/api/@v2/appointment/diagnose/useFetchBrowseAppointmentCidOptions'

export const FilterCid = ({ prefix = '' }: { prefix?: string }) => {
  const { cidOptions, setSearch, isLoading } = useFetchBrowseAppointmentCidOptions()

  return (
    <CAutoComplete
      label='CID'
      placeholder='Digite CID para buscar'
      name={prefix + 'cidId'}
      options={
        cidOptions?.data?.map((cid) => ({
          label: cid.label,
          value: cid.id,
        })) || []
      }
      onInputChange={(e, value, reason) => {
        if (reason === 'input') setSearch(value)
        if (reason === 'input' && !value) setSearch('')
      }}
      isLoading={isLoading}
    />
  )
}

export default FilterCid
