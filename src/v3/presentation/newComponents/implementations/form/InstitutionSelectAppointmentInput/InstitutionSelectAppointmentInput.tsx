import { debounce } from 'lodash'
import { useMemo, useRef, useState, useEffect } from 'react'

import {
  AutocompleteInput,
  ICAutocompleteUncontrolled,
} from '@/v3/presentation/components/AutocompleteInput'
import { useFetchBrowseAppointmentInstitutions } from '@/v3/presentation/hooks/api/@v2/appointment/institution/useFetchBrowseInstitutions'

import { CInput } from '../../..'

export interface IInstitutionSelectInput extends Partial<ICAutocompleteUncontrolled> {
  institutionId?: number | null
  setInstitutionId: (id?: number | null) => void
  options?: { value: number | null; label: string }[]
}

export const InstitutionAppointmentSelectInput = ({
  institutionId,
  setInstitutionId,
  options,
  label = 'Instituição',
  ...props
}: IInstitutionSelectInput) => {
  const [institutionFilter, setInstitutionFilter] = useState<string>('')
  const lastMountedOptions = useRef<any[]>([])
  const uniqueOptionLabelRef = useRef<string | undefined>()

  const { institutions, isLoading } = useFetchBrowseAppointmentInstitutions({
    search: institutionFilter,
    limit: 10,
  })

  const doInstitutionFilter = debounce((value: string | undefined) => {
    setInstitutionFilter(value || '')
  }, 600)

  const autoCompleteOptions = useMemo(() => {
    const institutionsOptions = (institutions?.data ?? []).map(({ id, fantasyName }) => ({
      value: id,
      label: fantasyName,
    }))

    const allOptionsMap = new Map()
    ;(options || []).forEach((option) => allOptionsMap.set(option.value, option))
    institutionsOptions.forEach((option) => allOptionsMap.set(option.value, option))
    const allOptions = Array.from(allOptionsMap.values())

    if (allOptions.length && !isLoading) {
      lastMountedOptions.current = allOptions
    } else {
      return lastMountedOptions.current
    }

    return allOptions
  }, [institutions, options, isLoading])

  useEffect(() => {
    if (!institutionId) {
      const currentOption = autoCompleteOptions.find((option) => option?.value === institutionId)
      if (currentOption) {
        setInstitutionFilter(currentOption?.label)
      }
    }
  }, [autoCompleteOptions, institutionId])

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
        size='small'
        fullWidth
        placeholder={label}
        InputLabelProps={{ shrink: true }}
        label={label}
        value={uniqueOptionLabelRef.current}
        disabled
      />
    )
  }
  const withNotFoundInstitution =
    institutionId &&
    !autoCompleteOptions.find((institution) => institution.value == Number(institutionId))

  if (withNotFoundInstitution) {
    return <CInput fullWidth size='small' label={label} disabled placeholder={label} />
  }

  return (
    <AutocompleteInput
      options={autoCompleteOptions}
      placeholder='Digite Instituição'
      label={label}
      value={
        autoCompleteOptions.find((institution) => institution.value === Number(institutionId)) ||
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
        if (option) {
          setInstitutionId(option.value)
          setInstitutionFilter(option.label)
        } else {
          setInstitutionId(null)
        }
      }}
      {...props}
    />
  )
}
