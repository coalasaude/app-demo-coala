import { Box, SwitchProps } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

import CSwitch from '../../../atoms/CSwitch'

export type CSwitchControlledProps = SwitchProps & {
  name: string
  label?: string
}

export const CSwitchControlled = ({ name, label, ...props }: CSwitchControlledProps) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onBlur, onChange, value, ...fieldProps } = field
        return (
          <Box display='flex' alignItems='center' justifyContent='flex-start' gap={1}>
            <CSwitch
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              onBlur={onBlur}
              {...fieldProps}
              {...props}
            />
            {label}
          </Box>
        )
      }}
    />
  )
}
