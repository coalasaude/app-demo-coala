import { debounce } from 'lodash'
import { useMemo, useRef, useState } from 'react'

import {
  AutocompleteInput,
  ICAutocompleteUncontrolled,
} from '@/v3/presentation/components/AutocompleteInput'
import { useFetchBrowseComplaint } from '@/v3/presentation/hooks/api/@v2/appointment/complaint/useFetchBrowseComplaint'

export interface IComplaintSelectInput extends Partial<ICAutocompleteUncontrolled> {
  complaintId?: number | null
  setComplaintId: (id?: number | null) => void
}

export const ComplaintSelectInput = ({
  complaintId,
  setComplaintId,
  label = 'Queixa',
  ...props
}: IComplaintSelectInput) => {
  const valueRef = useRef<any>()
  const complaintsRef = useRef<any>()
  const [complaintFilter, setComplaintFilter] = useState<string>()

  const { complaints, isLoading } = useFetchBrowseComplaint({
    name: complaintFilter,
    ids: complaintId ? [Number(complaintId)] : undefined,
    limit: 100,
  })

  const doComplaintFilter = debounce((value) => {
    setComplaintFilter(value)
  }, 600)

  const autoCompleteOptions = useMemo(() => {
    const complaintsOptions = complaints?.data?.map(({ id, name }) => ({
      value: id,
      label: name,
    }))

    return complaintsOptions || []
  }, [complaints])

  valueRef.current =
    autoCompleteOptions.find((complaint) => complaint.value == Number(complaintId)) ||
    valueRef.current

  if (complaints) complaintsRef.current = complaints
  if (!complaintsRef.current)
    return <AutocompleteInput key={String(Math.random())} disabled options={[]} />

  return (
    <AutocompleteInput
      data-testid='complaintField'
      key={valueRef.current}
      options={autoCompleteOptions}
      placeholder='Digite Queixa'
      label={label}
      value={valueRef.current}
      defaultChecked={!!complaintId}
      defaultValue={valueRef.current}
      isLoading={isLoading}
      onInputChange={(e, value, reason) => {
        if (reason === 'clear') {
          doComplaintFilter(undefined)
          valueRef.current = null
          return setComplaintId(null)
        }
        doComplaintFilter(value)
      }}
      onChange={(_, option) => {
        const value = option?.value || null
        if (!value) valueRef.current = value

        setComplaintFilter(undefined)
        setComplaintId(value)
      }}
      {...props}
    />
  )
}
