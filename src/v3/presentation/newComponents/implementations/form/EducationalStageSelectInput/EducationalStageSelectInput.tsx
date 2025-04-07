import { useMemo } from 'react'

import {
  AutocompleteInput,
  ICAutocompleteUncontrolled,
} from '@/v3/presentation/components/AutocompleteInput'
import { useFetchBrowseEducationalStage } from '@/v3/presentation/hooks/api/@v2/users/education-stages/useFetchBrowseEducationalStage'

export interface IEducationalStageSelectInput extends Partial<ICAutocompleteUncontrolled> {
  educationalStageId?: number | null
  setEducationalStageId: (id?: number | null) => void
}

export const EducationalStageSelectInput = ({
  educationalStageId,
  setEducationalStageId,
  label = 'Segmento',
  ...props
}: IEducationalStageSelectInput) => {
  const { educationalStages, isPending } = useFetchBrowseEducationalStage()

  const autoCompleteOptions = useMemo(() => {
    const allOptions = [...(educationalStages ?? [])]?.map(({ id, name }) => ({
      value: id,
      label: name,
    }))

    return allOptions
  }, [educationalStages])

  return (
    <AutocompleteInput
      options={autoCompleteOptions}
      label={label}
      value={
        autoCompleteOptions.find((option) => option.value == Number(educationalStageId)) || null
      }
      isLoading={isPending}
      onInputChange={(e, value, reason) => {
        if (reason === 'clear') {
          return setEducationalStageId(null)
        }
      }}
      onChange={(_, option) => {
        setEducationalStageId(option?.value || null)
      }}
      {...props}
    />
  )
}
