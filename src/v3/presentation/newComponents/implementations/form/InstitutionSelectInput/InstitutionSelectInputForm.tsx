import { get } from 'lodash'
import { UseControllerProps, useFormContext } from 'react-hook-form'

import { IInstitutionSelectInput, InstitutionSelectInput } from './InstitutionSelectInput'

export interface IInstitutionSelectInputForm
  extends Partial<IInstitutionSelectInput>,
    Omit<UseControllerProps<any>, 'control'> {
  error?: string
}

export const InstitutionSelectInputForm = ({
  name,
  error,
  ...props
}: IInstitutionSelectInputForm) => {
  const { setValue, formState, watch } = useFormContext()

  const errorMessage = get(formState?.errors, `${name}.message`) || error
  const value = watch(name)

  return (
    <InstitutionSelectInput
      errorMessage={errorMessage as string}
      {...props}
      setInstitutionId={(value) => {
        return setValue(name, value)
      }}
      institutionId={value}
      isOptionEqualToValue={(option) => option.value === value}
    />
  )
}
