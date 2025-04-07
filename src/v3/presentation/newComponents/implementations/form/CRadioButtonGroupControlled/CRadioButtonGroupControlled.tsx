import { Controller, useFormContext } from 'react-hook-form'
import { FC } from 'react'
import { get } from 'lodash'

import {
  CRadioButtonGroup,
  IRadioButtonGroupProps,
} from '../../../molecules/CRadioButtonGroup/CRadioButtonGroup'

export const CRadioButtonGroupControlled: FC<IRadioButtonGroupProps> = ({
  name,
  label,
  options,
  labelPlacement,
  disabled,
  error,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => {
        const errorMessage = (get(formState?.errors, `${name}.message`) || error) as
          | string
          | undefined

        return (
          <CRadioButtonGroup
            {...props}
            key={name}
            label={label}
            labelPlacement={labelPlacement}
            field={field}
            name={name}
            options={options}
            disabled={disabled}
            error={errorMessage}
          />
        )
      }}
    />
  )
}
