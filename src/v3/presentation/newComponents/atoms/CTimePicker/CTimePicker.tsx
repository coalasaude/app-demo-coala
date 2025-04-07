import React from 'react'
import { TimePickerProps, TimePicker, renderTimeViewClock } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { IconButton, InputAdornment } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import useMediaQuery from '@/hooks/useMediaQuery'

type CTimePickerProps = Omit<Partial<TimePickerProps<Dayjs>>, 'error'> & {
  error?: any
  'data-testid'?: string
}

export const CTimePicker = ({ label, 'data-testid': dataTestid, ...props }: CTimePickerProps) => {
  const isSmallDevice = useMediaQuery('sm')

  const inputProps = isSmallDevice
    ? {
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton edge='end'>
              <AccessTimeIcon />
            </IconButton>
          </InputAdornment>
        ),
      }
    : {}

  return (
    <TimePicker
      {...props}
      value={props.value ? dayjs(props.value) : undefined}
      format='HH:mm'
      ampm={false}
      viewRenderers={{
        hours: renderTimeViewClock,
        minutes: renderTimeViewClock,
        seconds: renderTimeViewClock,
      }}
      slotProps={{
        textField: {
          inputProps: {
            'data-testid': dataTestid,
          },
          error: !!props.error,
          helperText: props.error as string,
          size: 'small',
          fullWidth: true,
          label: label,
          InputProps: inputProps,
          sx: { '& .MuiInputLabel-root': { width: 'calc(100% - 50px)' } },
        },
      }}
    />
  )
}

export default CTimePicker
