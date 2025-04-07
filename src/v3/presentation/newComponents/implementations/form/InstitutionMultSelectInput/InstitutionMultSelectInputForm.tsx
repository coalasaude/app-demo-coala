import { get } from 'lodash'
import { UseControllerProps, useFormContext } from 'react-hook-form'

import {
  IInstitutionMultSelectInput,
  InstitutionMultSelectInput,
} from './InstitutionMultSelectInput'

export interface IInstitutionMultSelectInputForm
  extends Partial<IInstitutionMultSelectInput>,
    Omit<UseControllerProps<any>, 'control'> {
  error?: string
}

export const InstitutionMultSelectInputForm = ({
  name,
  error,
  ...props
}: IInstitutionMultSelectInputForm) => {
  const { setValue, formState, watch } = useFormContext()

  const errorMessage = get(formState?.errors, `${name}.message`) || error
  const value = watch(name)

  return (
    <InstitutionMultSelectInput
      errorMessage={errorMessage as string}
      {...props}
      setInstitutionsIds={(value) => {
        return setValue(name, value)
      }}
      institutionsIds={value}
    />
  )
}
