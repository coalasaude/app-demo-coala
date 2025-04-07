import React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { IconButton, InputAdornment } from '@mui/material'
import { CalendarIcon } from '@mui/x-date-pickers/icons'

import useMediaQuery from '@/hooks/useMediaQuery'

type CDatePickerProps = Partial<DatePickerProps<Dayjs>> & {
  error?: string
  placeholder?: string
  getFieldValue?: (value: any) => any
}

export const CDatePicker = ({ label, placeholder, ...props }: CDatePickerProps) => {
  const isSmallDevice = useMediaQuery('sm')

  const inputProps = isSmallDevice
    ? {
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton edge='end'>
              <CalendarIcon />
            </IconButton>
          </InputAdornment>
        ),
      }
    : {}

  return (
    <DatePicker
      {...props}
      label={label}
      value={props.value ? dayjs(props.value) : null}
      localeText={{
        fieldDayPlaceholder: () => '__',
        fieldMonthPlaceholder: () => '__',
        fieldYearPlaceholder: () => '____',
      }}
      slotProps={{
        textField: {
          size: 'small',
          placeholder,
          sx: { '& .MuiInputLabel-root': { width: 'calc(100% - 40px)' } },
          helperText: props.error!,
          fullWidth: true,
          error: !!props.error,
          InputProps: inputProps,
        },
      }}
    />
  )
}

export default CDatePicker
