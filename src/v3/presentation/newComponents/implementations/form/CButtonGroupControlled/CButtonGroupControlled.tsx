import { get } from 'lodash'
import { useFormContext, useWatch } from 'react-hook-form'
import { Box, Typography } from '@mui/material'

import { CButton } from '../../../atoms'
import { CButtonGroup } from '../../../molecules/CButtonGroup'
import { CButtonGroupProps } from '../../../molecules/CButtonGroup/CButtonGroup'

interface CButtonGroupControlledProps<T> {
  name: string
  error?: string
  disabled?: boolean
  buttonGroupProps?: CButtonGroupProps
  options: {
    label: string
    value: T
  }[]
}

export function CButtonGroupControlled<T>({
  name,
  options,
  error,
  disabled,
  buttonGroupProps,
}: CButtonGroupControlledProps<T>) {
  const { setValue, formState, control } = useFormContext()

  const errors = formState?.errors
  const errorMessage = get(errors, `${name}.message`, error)

  const value = useWatch({ name, control })
  const selectedIndex = options.findIndex((option) => option.value === value)

  return (
    <Box>
      <CButtonGroup
        orientation='horizontal'
        size='small'
        variant='secondary'
        {...buttonGroupProps}
        selectedIndex={selectedIndex}
      >
        {options.map((option) => (
          <CButton
            disabled={disabled}
            key={option.label}
            onClick={() => setValue(name, option.value)}
          >
            {option.label}
          </CButton>
        ))}
      </CButtonGroup>
      {errorMessage && <Typography color='error'>{String(errorMessage)}</Typography>}
    </Box>
  )
}
