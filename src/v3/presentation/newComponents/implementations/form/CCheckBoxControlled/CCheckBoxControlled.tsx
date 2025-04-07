import React from 'react'
import { FormControl, FormGroup, FormGroupProps, FormHelperText, FormLabel } from '@mui/material'
import { get } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

import CCheckbox from '../../../atoms/CCheckBox'
import { CFormControlLabel } from '../../../molecules/CFormControlLabel'
import { CCheckboxProps } from '../../../atoms/CCheckBox/CCheckbox'

interface CheckboxOption {
  value: any
  label: string | React.ReactElement
}

interface CCheckboxControlledProps extends CCheckboxProps {
  name: string
  rules?: any
  onBlur?: (event: React.FocusEvent) => void
  error?: string
  label?: string
  values: CheckboxOption
  formGroupProps?: FormGroupProps
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom'
  size?: 'small' | 'medium'
}

export const CCheckBoxControlled = ({
  name,
  rules,
  onBlur: onBlurC,
  error,
  label,
  values,
  formGroupProps,
  labelPlacement,
  ...props
}: CCheckboxControlledProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const errorMessage = get(errors, `${name}.message`, error)

  return (
    <FormControl error={!!errorMessage}>
      {label && <FormLabel id={name}>{label}</FormLabel>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <FormGroup row {...formGroupProps}>
            <CFormControlLabel
              key={values.value}
              labelPlacement={labelPlacement}
              control={
                <CCheckbox
                  {...props}
                  {...field}
                  value={values.value}
                  checked={field.value || false}
                  onBlur={(e) => {
                    onBlurC?.(e)
                    field.onBlur()
                  }}
                />
              }
              label={values.label}
            />
          </FormGroup>
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage as string}</FormHelperText>}
    </FormControl>
  )
}
