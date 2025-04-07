import { get } from 'lodash'
import { UseControllerProps, useFormContext, useWatch } from 'react-hook-form'

import { ISubjectSelectInput, SubjectSelectInput } from './SubjectSelectInput'

export interface ISubjectSelectInputForm
  extends Partial<ISubjectSelectInput>,
    Omit<UseControllerProps<any>, 'control'> {
  error?: string
}

export const SubjectSelectInputForm = ({ name, error, ...props }: ISubjectSelectInputForm) => {
  const { setValue, formState, control } = useFormContext()

  const errorMessage = get(formState?.errors, `${name}.message`) || error
  const value = useWatch({ name, control })

  return (
    <SubjectSelectInput
      errorMessage={errorMessage as string}
      {...props}
      setSubjectIds={(value) => {
        return setValue(name, value)
      }}
      subjectIds={value}
    />
  )
}
