import { get } from 'lodash'
import { UseControllerProps, useFormContext } from 'react-hook-form'

import { IComplaintSelectInput, ComplaintSelectInput } from './ComplaintSelectInput'

export interface IComplaintSelectInputForm
  extends Partial<IComplaintSelectInput>,
    Omit<UseControllerProps<any>, 'control'> {
  error?: string
}

export const ComplaintSelectInputForm = ({ name, error, ...props }: IComplaintSelectInputForm) => {
  const { setValue, formState, watch } = useFormContext()

  const errorMessage = get(formState?.errors, `${name}.message`) || error
  const value = watch(name)

  return (
    <ComplaintSelectInput
      errorMessage={errorMessage as string}
      defaultChecked={!!value}
      defaultValue={value}
      {...props}
      setComplaintId={(value) => {
        return setValue(name, value)
      }}
      complaintId={value}
      isOptionEqualToValue={(option) => option.value === value}
    />
  )
}
