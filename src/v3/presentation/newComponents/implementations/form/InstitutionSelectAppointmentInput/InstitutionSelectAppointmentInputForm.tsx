import { get } from 'lodash'
import { UseControllerProps, useFormContext } from 'react-hook-form'

import {
  IInstitutionSelectInput,
  InstitutionAppointmentSelectInput,
} from './InstitutionSelectAppointmentInput'

export interface IInstitutionSelectInputForm
  extends Partial<IInstitutionSelectInput>,
    Omit<UseControllerProps<any>, 'control'> {
  error?: string
}

export const InstitutionAppointmentSelectInputForm = ({
  name,
  error,
  ...props
}: IInstitutionSelectInputForm) => {
  const { setValue, formState, watch } = useFormContext()

  const errorMessage = get(formState?.errors, `${name}.message`) || error
  const value = watch(name)

  return (
    <InstitutionAppointmentSelectInput
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
