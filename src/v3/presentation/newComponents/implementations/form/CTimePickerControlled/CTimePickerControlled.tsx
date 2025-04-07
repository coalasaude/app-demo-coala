import _ from 'lodash'
import React from 'react'
import { Controller, UseControllerProps, useFormContext } from 'react-hook-form'
import { TimePickerProps } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'

import CTimePicker from '../../../atoms/CTimePicker'

type CTimePickerControlledProps = Omit<UseControllerProps<any>, 'control' | 'error'> &
  Omit<Partial<TimePickerProps<Dayjs>>, 'error'> & { error?: any; 'data-testid'?: string }

export const CTimePickerControlled = ({
  name,
  rules,
  error,
  label,
  ...props
}: CTimePickerControlledProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, formState }) => {
        const errorMessage = _.get(formState?.errors, `${name}.message`) || error

        return (
          <CTimePicker
            {...props}
            label={label}
            value={field.value ? dayjs(field.value) : undefined}
            onChange={(newValue) => field.onChange(newValue)}
            error={errorMessage as string}
          />
        )
      }}
    />
  )
}

export default CTimePickerControlled
