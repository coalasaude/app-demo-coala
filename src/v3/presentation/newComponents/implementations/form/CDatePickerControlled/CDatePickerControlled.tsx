import _ from 'lodash'
import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import { DatePickerProps } from '@mui/x-date-pickers'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'

import CDatePicker from '../../../atoms/CDatePicker'

type CDatePickerControlledProps = Omit<UseControllerProps<any>, 'control'> &
  Partial<DatePickerProps<Dayjs>> & {
    error?: string
    getFieldValue?: (value: any) => any
    placeholder?: string
  }

export const CDatePickerControlled = ({
  name,
  rules,
  error,
  label,
  getFieldValue,
  placeholder,
  ...props
}: CDatePickerControlledProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, formState }) => {
        const errorMessage = _.get(formState?.errors, `${name}.message`) || error
        const value = getFieldValue ? getFieldValue(field.value) : field.value

        return (
          <CDatePicker
            {...props}
            placeholder={placeholder}
            label={label}
            value={value ? dayjs(value) : undefined}
            onChange={(newValue) => field.onChange(newValue)}
            error={errorMessage as string}
          />
        )
      }}
    />
  )
}

export default CDatePickerControlled
