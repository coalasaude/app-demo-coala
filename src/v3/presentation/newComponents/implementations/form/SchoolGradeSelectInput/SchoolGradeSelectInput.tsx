import { useMemo } from 'react'

import {
  AutocompleteInput,
  ICAutocompleteUncontrolled,
} from '@/v3/presentation/components/AutocompleteInput'
import { useFetchBrowseSchoolGrade } from '@/v3/presentation/hooks/api/@v2/users/school-grades/useFetchBrowseSchoolGrade'

export interface ISchoolGradeSelectInput extends Partial<ICAutocompleteUncontrolled> {
  schoolGradeId?: number | null
  educationalStageId?: number
  setSchoolGradeId: (id?: number | null) => void
}

export const SchoolGradeSelectInput = ({
  schoolGradeId,
  setSchoolGradeId,
  label = 'Série',
  educationalStageId,
  ...props
}: ISchoolGradeSelectInput) => {
  const { schoolGrades, isPending } = useFetchBrowseSchoolGrade({ educationalStageId })

  const autoCompleteOptions = useMemo(() => {
    const allOptions = [...(schoolGrades ?? [])]?.map(({ id, name }) => ({
      value: id,
      label: name,
    }))

    return allOptions
  }, [schoolGrades])

  return (
    <AutocompleteInput
      options={autoCompleteOptions}
      label={label}
      value={autoCompleteOptions.find((option) => option.value == Number(schoolGradeId)) || null}
      isLoading={isPending}
      onInputChange={(e, value, reason) => {
        if (reason === 'clear') {
          return setSchoolGradeId(null)
        }
      }}
      onChange={(_, option) => {
        setSchoolGradeId(option?.value || null)
      }}
      {...props}
    />
  )
}
