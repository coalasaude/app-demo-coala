import { get } from 'lodash'
import { UseControllerProps, useFormContext } from 'react-hook-form'

import {
  ICompanyPositionSelectInput,
  CompanyPositionSelectInput,
} from './CompanyPositionSelectInput'

export interface ICompanyPositionSelectInputForm
  extends Partial<ICompanyPositionSelectInput>,
    Omit<UseControllerProps<any>, 'control'> {
  error?: string
}

export const CompanyPositionSelectInputForm = ({
  name,
  error,
  ...props
}: ICompanyPositionSelectInputForm) => {
  const { setValue, formState, watch } = useFormContext()

  const errorMessage = get(formState?.errors, `${name}.message`) || error
  const value = watch(name)

  return (
    <CompanyPositionSelectInput
      errorMessage={errorMessage as string}
      {...props}
      setCompanyPositionId={(value) => {
        return setValue(name, value)
      }}
      companyPositionId={value}
      isOptionEqualToValue={(option) => option.value === value}
    />
  )
}
