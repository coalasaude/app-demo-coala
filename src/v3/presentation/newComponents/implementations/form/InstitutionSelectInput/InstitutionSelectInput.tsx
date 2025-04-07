import { debounce } from 'lodash'
import { useMemo, useRef, useState } from 'react'

import {
  AutocompleteInput,
  ICAutocompleteUncontrolled,
} from '@/v3/presentation/components/AutocompleteInput'
import { useFetchInstitutions } from '@/v3/presentation/hooks/api/institution/useFetchInstitutions'

import { CInput } from '../../../'

export interface IInstitutionSelectInput extends Partial<ICAutocompleteUncontrolled> {
  institutionId?: number | null
  setInstitutionId: (id?: number | null) => void
  options?: { value: number | null; label: string }[]
}

export const InstitutionSelectInput = ({
  institutionId,
  setInstitutionId,
  options,
  label = 'Instituição',
  ...props
}: IInstitutionSelectInput) => {
  const [institutionFilter, setInstitutionFilter] = useState<string>()
  const lastMountedOptions = useRef<any[]>([])
  const uniqueOptionLabelRef = useRef()

  const { institutions, isLoading } = useFetchInstitutions({
    searchName: institutionFilter,
    includeIds: institutionId ? [institutionId] : null,
    limit: 10,
  })

  const doInstitutionFilter = debounce((value) => {
    setInstitutionFilter(value)
  }, 600)

  const autoCompleteOptions = useMemo(() => {
    const institutionsOptions = [...(institutions ?? [])]?.map(({ id, fantasyName }) => ({
      value: id,
      label: fantasyName,
    }))

    const allOptions = [...(options || []), ...institutionsOptions]

    if (allOptions.length && !isLoading) lastMountedOptions.current = allOptions
    else return lastMountedOptions.current

    return allOptions
  }, [institutions, options, isLoading])

  const hasOneInstitution =
    !institutionFilter && autoCompleteOptions.length === 1 && !!autoCompleteOptions?.[0]?.value

  if (hasOneInstitution) {
    const id = autoCompleteOptions?.[0]?.value
    if (!institutionId && id) {
      setInstitutionId(id)
    }
    uniqueOptionLabelRef.current = autoCompleteOptions?.[0]?.label || ''

    return (
      <CInput
        fullWidth
        placeholder={label}
        InputLabelProps={{ shrink: true }}
        label={label}
        value={uniqueOptionLabelRef.current}
        sx={{ mb: '1rem', mt: '1rem' }}
        disabled
      />
    )
  }
  const withNotFoundInstitution =
    institutionId &&
    !autoCompleteOptions.find((institution) => institution.value == Number(institutionId))

  if (withNotFoundInstitution) {
    return <CInput fullWidth label={label} disabled placeholder={label} />
  }

  return (
    <AutocompleteInput
      options={autoCompleteOptions}
      placeholder='Digite Instituição'
      label={label}
      value={
        autoCompleteOptions.find((institution) => institution.value == Number(institutionId)) ||
        null
      }
      isLoading={isLoading}
      onInputChange={(e, value, reason) => {
        if (reason === 'clear') {
          doInstitutionFilter(undefined)
          return setInstitutionId(null)
        }
        doInstitutionFilter(value)
      }}
      onChange={(_, option) => {
        doInstitutionFilter(undefined)
        setInstitutionId(option?.value || null)
      }}
      {...props}
    />
  )
}
