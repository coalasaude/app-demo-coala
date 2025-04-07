import { get } from 'lodash'
import { UseControllerProps, useFormContext } from 'react-hook-form'

import { IBrandSelectInput, BrandSelectInput } from './BrandSelectInput'

export interface IBrandSelectInputForm
  extends Partial<IBrandSelectInput>,
    Omit<UseControllerProps<any>, 'control'> {
  error?: string
  onBrandChange?: (value?: number | null) => void
}

export const BrandSelectInputForm = ({
  name,
  error,
  onBrandChange,
  ...props
}: IBrandSelectInputForm) => {
  const { setValue, formState, watch } = useFormContext()

  const errorMessage = get(formState?.errors, `${name}.message`) || error
  const value = watch(name)

  return (
    <BrandSelectInput
      errorMessage={errorMessage as string}
      {...props}
      setBrandId={(value) => {
        onBrandChange && onBrandChange(value)
        return setValue(name, value)
      }}
      brandId={value}
      isOptionEqualToValue={(option) => option.value === value}
    />
  )
}
