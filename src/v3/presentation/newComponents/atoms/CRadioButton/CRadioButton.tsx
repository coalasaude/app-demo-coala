import React from 'react'
import { Radio, RadioProps } from '@mui/material'

export const CRadioButton = ({ disabled, checked, onChange, ...props }: RadioProps) => {
  return (
    <Radio
      {...props}
      sx={{
        ...props.sx,
        ':hover': {
          backgroundColor: checked
            ? 'var(--mui-palette-primary-light)'
            : 'var(--mui-palette-grey-200)',
        },
      }}
      disabled={disabled}
      onChange={(e, checked) => {
        onChange?.(e, checked)
      }}
      checked={checked}
    />
  )
}
