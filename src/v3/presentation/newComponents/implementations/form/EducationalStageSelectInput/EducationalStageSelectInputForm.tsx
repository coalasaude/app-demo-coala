import { get } from 'lodash'
import { UseControllerProps, useFormContext } from 'react-hook-form'

import {
  IEducationalStageSelectInput,
  EducationalStageSelectInput,
} from './EducationalStageSelectInput'

export interface IEducationalStageSelectInputForm
  extends Partial<IEducationalStageSelectInput>,
    Omit<UseControllerProps<any>, 'control'> {
  error?: string
  onEducationalChange?: (value?: number | null) => void
}

export const EducationalStageSelectInputForm = ({
  name,
  error,
  onEducationalChange,
  ...props
}: IEducationalStageSelectInputForm) => {
  const { setValue, formState, watch } = useFormContext()

  const errorMessage = get(formState?.errors, `${name}.message`) || error
  const value = watch(name)

  return (
    <EducationalStageSelectInput
      errorMessage={errorMessage as string}
      {...props}
      setEducationalStageId={(value) => {
        onEducationalChange && onEducationalChange(value)
        return setValue(name, value)
      }}
      educationalStageId={value}
      isOptionEqualToValue={(option) => option.value === value}
    />
  )
}
