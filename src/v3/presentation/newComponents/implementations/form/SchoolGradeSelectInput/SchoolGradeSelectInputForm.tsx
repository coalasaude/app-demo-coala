import { get } from 'lodash'
import { UseControllerProps, useFormContext } from 'react-hook-form'

import { ISchoolGradeSelectInput, SchoolGradeSelectInput } from './SchoolGradeSelectInput'

export interface ISchoolGradeSelectInputForm
  extends Partial<ISchoolGradeSelectInput>,
    Omit<UseControllerProps<any>, 'control'> {
  error?: string
}

export const SchoolGradeSelectInputForm = ({
  name,
  error,
  ...props
}: ISchoolGradeSelectInputForm) => {
  const { setValue, formState, watch } = useFormContext()

  const errorMessage = get(formState?.errors, `${name}.message`) || error
  const value = watch(name)

  return (
    <SchoolGradeSelectInput
      errorMessage={errorMessage as string}
      {...props}
      setSchoolGradeId={(value) => {
        return setValue(name, value)
      }}
      schoolGradeId={value}
      isOptionEqualToValue={(option) => option.value === value}
    />
  )
}
