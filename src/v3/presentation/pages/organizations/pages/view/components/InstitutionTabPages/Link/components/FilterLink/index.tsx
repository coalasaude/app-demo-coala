import { Dispatch, SetStateAction } from 'react'

import FilterInput from '@/components/Forms/uncontrolled/FilterInput'

export const LinkedInstitutionsFilter = ({
  setNameFilter,
  nameFilter,
}: {
  setNameFilter: Dispatch<SetStateAction<string>>
  nameFilter: string
}) => {
  return (
    <FilterInput
      onChange={(e) => setNameFilter(e.target.value)}
      name='name'
      onBlur={(e) => {
        const value = e.currentTarget.value
        if (value) setNameFilter(value)
      }}
      onClearAddon={() => {
        setNameFilter('')
      }}
      value={nameFilter}
      label='Instituições'
      placeholder='Digite o nome da instituição'
    />
  )
}
