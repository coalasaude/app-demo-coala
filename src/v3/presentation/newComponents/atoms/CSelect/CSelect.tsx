import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectProps } from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import { FormHelperText } from '@mui/material'

import CMenuItem from '../CMenuItem'
import { CMenuItemProps } from '../CMenuItem/CMenuItem'

export interface CSelectProps extends SelectProps {
  options?: {
    value: any
    label: string
    itemProps?: CMenuItemProps
  }[]
  withoutLabel?: boolean
  nullOptionText?: string
  disabledNullOption?: boolean
  errorMessage?: string
  error?: any
}

export function CSelect({ variant, sx, withoutLabel, ...props }: CSelectProps) {
  return (
    <FormControl
      fullWidth
      size='small'
      sx={{
        ...(variant == 'filled' && {
          '& .MuiInputBase-root': {
            backgroundColor: 'var(--mui-palette-grey-100)',
            outline: 'none',
            border: 'none',
            fontSize: '14px !important',
            height: '34px',
            minHeight: '34px',
          },
          '& .MuiSelect-select': {
            fontSize: '14px !important',
            padding: '0 14px',
          },
          '& fieldset': {
            border: 'none',
          },
        }),
        ...sx,
      }}
    >
      {!withoutLabel && (
        <InputLabel id='demo-simple-select-label' error={!!props.errorMessage}>
          {props?.label || props?.placeholder || 'Selecione uma opção'}
        </InputLabel>
      )}
      <Select
        {...props}
        {...(!withoutLabel && {
          labelId: 'demo-simple-select-label',
          label: props?.label || props?.placeholder || 'Selecione uma opção',
        })}
        size='small'
        sx={sx}
        MenuProps={{
          sx: { maxHeight: 300 },
        }}
      >
        {!props.disabledNullOption && (
          <CMenuItem component={props.native ? 'option' : 'li'} value=''>
            {props.nullOptionText ?? '-'}
          </CMenuItem>
        )}
        {props?.options?.map(({ value, label }) => (
          <CMenuItem component={props.native ? 'option' : 'li'} value={value} key={value}>
            {label}
          </CMenuItem>
        ))}
      </Select>
      {!!props.errorMessage && (
        <FormHelperText error={!!props.errorMessage}>{props.errorMessage}</FormHelperText>
      )}
    </FormControl>
  )
}
